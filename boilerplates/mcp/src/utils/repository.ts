
import { simpleGit, SimpleGit } from 'simple-git';
import * as fs from 'fs/promises';
import * as path from 'path';
import { config, type PLATFORMS } from '../config.js';


export const repoTools = async (url: string, dir: string) => {
  const git: SimpleGit = simpleGit({
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 1,
  }); 

  async function ensureRepo(): Promise<void> { 
    try { 
      const exists = await fs.access(dir)
        .then(() => true)
        .catch((error) => {
          console.warn(`Something went wrong accessing the repository directory: ${error}`);
          return false;
        });
      
      if (!exists) { 
        console.log("Cloning repository...");
        await git.clone(url, dir);
      } else {
        console.log("Pulling repository...");
        await simpleGit(dir).pull();
      }
    } catch (error) {
      console.error("Error managing repository:", error);
      throw error;
    }
  }

  async function getDirectoryStructure(platform: PLATFORMS): Promise<string[]> {
    const dirPath = path.join(process.cwd(), dir, config.boilerplateDir, platform);
    const files: string[] = [];

    async function traverse(dir: string, prefix: string = ""): Promise<void> {
      console.log(`Reading directory: ${dir}`);
      const entries = await fs.readdir( dir, {withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.join(prefix, entry.name);
        
        if (entry.isDirectory()) {
          files.push(`${relativePath}/`);
          await traverse(fullPath, relativePath);
        } else {
          files.push(relativePath);
        }
      }
    }

    await traverse(dirPath);
    return files;
  }

  async function readAgentsMd(platform: PLATFORMS): Promise<string> {
    // TODO: Make the file name configurable or change the code to iterate over all markdown files in the directory.
    const filePath = path.join(dir, config.boilerplateDir, platform, "AGENTS.md");
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch (error) {
      throw new Error(`Failed to read AGENTS.md for ${platform}: ${error}`);
    }
  }
  try { 
    await ensureRepo()
  } catch (error) {
    console.error('Failed to initialize repository:', error);
    process.exit(1);
  };


  return {
    ensureRepo,
    getDirectoryStructure,
    readAgentsMd
  }
}