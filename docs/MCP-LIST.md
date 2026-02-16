# List of available MCPs

## Best Practices
Everything we need to know on how we build software. 

### Overview
* Context: Technical Knowledge
* Type: Read-Heavy
* Risk: Low
* Quality: High

### Resources:
* `coding_standards.md`: Company coding conventions (naming, structure, error handling, logging).
* `architecture_overview.md`: High-level system diagram + module boundaries.
* `repo_structure.json`: Logical explanation of package layout.
* `template.react_component.tsx`: Boilerplate component template.
* `template.service.ts`: Backend service template.
* `testing_guidelines.md`: How to write unit/integration tests.
* `security_guidelines.md`: Secrets handling, input validation, auth patterns.
* `eslint_ruleset`: Explanation of lint rules and why they exist.

### Tools
* `search_codebase(query):` Semantic search across repo.
* `summarize_module(path)`: Explain module responsibilities + dependencies.
* `check_pattern_compliance(code_snippet)`: Validate against best practices.
* `suggest_refactor(diff)`: Propose improvements aligned with internal standards.
* `generate_from_template(template_name, inputs)`: Instantiate official templates.

### Prompts
* `/new-feature-skeleton`: Generates folder structure + boilerplate aligned with architecture.
* `/refactor-plan`: Produces a structured refactor plan referencing internal rules.
* `/code-review-checklist`: Generates checklist aligned with team standards.
* `/test-plan`: Creates a testing strategy based on guidelines.
---

## Product Context
Everything we need to know on what we are building and why.

### Overview
* Context: Business/Domain Knowledge
* Type: Read-Heavy
* Risk: Low
* Quality: Semi-curated
### Resources
* `product_vision.md`: Vision, mission, strategic pillars.
* `roadmap_2026.json`: Roadmap structured by quarter.
* `feature_definitions/*`: Canonical feature specs.
* `design_tokens.json`: Shared UI tokens.
* `figma_component_map.json`: Mapping between product concepts and UI components.
* `glossary.md`: Domain-specific terminology.
* `customer_personas.json`: Defined personas.
* `analytics_metrics.md`: KPIs and definitions.
### Tools
* `summarize_feature(feature_id)`: Condensed explanation of feature scope.
* `generate_user_story(raw_notes)`: Converts notes into structured user story.
* `derive_acceptance_criteria(feature_id)`: Produces criteria aligned with product definitions.
* `check_roadmap_alignment(feature_id)`: Validates if feature aligns with roadmap/vision.
* `map_feature_to_ui(feature_id)`: Returns relevant design components.

### Prompts
* `/draft-prd`: Structured PRD generator.
* `/refine-requirement`: Converts rough notes into formal requirements.
* `/impact-analysis`: Analyzes business, UX, and technical implications.
* `/feature-brief`: Short, shareable feature summary for dev kickoff.
---

## Orchestration
Everything we need to execute state-changing actions across systems.
### Overview
* Context: Side-effects executions
* Type: Write-Heavy
* Risk: High
* Quality: N/A


### Resources
* `connected_accounts.json`
* `available_workflows.json`
* `service_capabilities.json`

### Tools
#### GitHub
* `github.create_issue(data)`
* `github.update_issue(issue_id, updates)`
* `github.create_branch(name)`
* `github.commit_file(path, content)`
* `github.open_pr(data)`

#### Notion
* `notion.create_page(database_id, content)`
* `notion.update_page(page_id, content)`
* `notion.query_database(query)`

#### Google Drive
* `gdrive.create_doc(title, content)`
* `gdrive.update_doc(doc_id, content)`

#### Figma
* `figma.get_file_metadata(file_id)`
* `figma.comment_on_node(node_id, comment)`

#### Ritual automation
* `create_refinement_packet(feature_id)`
* `publish_plan_md(issue_id, content)`
* `schedule_meeting(title, attendees)`

### Prompt
* `/create-github-issue`
* `/publish-prd-to-notion`
* `/generate-plan-and-open-pr`
* `/run-refinement-session`