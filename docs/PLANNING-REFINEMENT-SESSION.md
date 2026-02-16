# Planning/Refinement Session Workflow

## Description
Creates issues in a repository based on prompt interaction with user to match minimum requirements schema.

### Placeholder Workflows:
* **Define Problem**: Prompt interaction from the business/product perspective. Questionnaire examples:
* **Alignment Validation**: Internal check against Product Contexts to 
* **Technical Review**: Prompt interaction from the technical/architectural perspective.
* **Issue Validation**: Internal readiness evaluation from a standard checklist to validate the current status of the issue.
  
### Internal Steps:
1. **Start Session**: Load Session Notes and Follow Ups from previous Session and prioritize them accordingly. 
2. **Load Contexts**: Pull Product and Best Practices contexts from MCP.
3. **Draft Issue**: Formatted output presented to the user for a approval built from previous processes following a standard structure. 
4. **Create Issue**: Send formatted issue to the MCP service for issue creation. 
5. **End Session**: Store Session Notes and Follow Ups for next Session. 


### Issue structure
```
# Title
## Problem
### (Short)Description

### User Story

### Acceptance Criteria

## Technical 
### Considerations
### Dependencies
### Out of Scope
### Test Plan
```

#### Source mapping:
| Section             | Source                | Allow TBD |
| ------------------- | --------------------- | --------- |
| Problem             | Product Context       | No        |
| User Story          | Product Context Tool  | Yes       |
| Acceptance Criteria | Product Context Tool  | Yes       |
| Technical Notes     | Best Practices tool   | No        |
| Test Plan           | Best Practices Prompt | Yes       |


## Product Context MCP
* product_vision.md
* Relevant roadmap_2026
* Related feature_definitions

## Product Context MCP
* issue_template.md
* architecture_overview.md
* coding_standards.md


## Workflow:

1. A trigger is sent to indicate that the Session is started. **Execute Start Session** step. 
2. Call is made to MCPs to **Load Contexts** step.
3. **Prompt**/**Iterate**: Are there new issues to create/refine? 
   1. If it's a new Issue, **execute Define Problem** workflow.
   2. If it's an existing Issue, **execute Read Issue** workflow, and **Prompt** if the previous problem definition is valid.
      1. If it's not valid, **execute Define Problem**  workflow with previous issue data. 
4. **Execute Alignment Validation**  workflow.
5. **Execute Technical Review** workflow.
6. **Execute Draft Issue** step.
7. **Execute Issue Validation** workflow.
8. **Prompt** User for approval.
9. **Execute Create Issue** step.
10. **Execute End Session** step.