# Issue Validation Workflow

## Description
Performs an internal readiness evaluation of the Issue using a standardized checklist.

This workflow ensures:
- Acceptance criteria are testable.
- Scope is realistic.
- Dependencies are identified and ready.
- Technical review is complete.
- The issue is understandable to a developer unfamiliar with the project.
- The issue meets minimum schema requirements.

This workflow determines the Issue Status before orchestration.

---

### Placeholder Workflows:
* **Checklist Evaluation**
* **Scope Assessment**
* **Dependency Status Check**
* **Clarity Assessment**
* **Readiness Classification**

---

### Internal Steps:
1. **Load Draft Issue**: Retrieve structured output from Problem Definition and Technical Review.
2. **Evaluate Acceptance Criteria**: Determine if criteria are specific and testable.
3. **Evaluate Metrics & Impact**: Ensure measurable success criteria are defined when required.
4. **Assess Scope Size**: Determine if issue is appropriately scoped for a single delivery cycle.
5. **Check Dependencies**: Validate that dependencies are ready or clearly defined.
6. **Assess Implementation Readiness**: Ensure technical notes are actionable.
7. **Clarity Simulation**: Evaluate whether a new developer could understand requirements without additional context.
8. **Determine Issue Classification**: Assign readiness status.
9. **Produce Validation Report**.

---

## Best Practices MCP
  * Tools:
    * `validate_acceptance_criteria`
    * `scope_size_estimator`
    * `dependency_readiness_check`
    * `readability_assessment`
  * Resources
    * `issue_template.md`
    * `testing_guidelines.md`
    * `architecture_overview.md`
  * Prompts
    * `/issue-readiness-check`
    * `/clarity-simulation`

## Issue Validation Data Structure

Issue Validation Report
Acceptance Criteria <Valid / Needs Refinement>
Metrics <Valid / Needs Refinement>
Scope <Valid / Needs Refinement>
Dependencies <Valid / Blocked>
Implementation Readiness <Valid / Needs Refinement>
Clarity <Valid / Needs Refinement>

⸻

Final Classification: READY / NEEDS_REFINEMENT / BLOCKED / INCOMPLETE

Required Actions: {List of required actions}


## Workflow:

1. A trigger is received indicating execution of **Issue Validation** workflow.
2. Load full Draft Issue structure from session state.

3. **Execute Checklist Evaluation**:
   1. Check: Is acceptance criteria testable?
      - Output: Valid / Needs Refinement
   2. Check: Are metrics required or defined?
      - Output: Valid / Needs Refinement
   3. Check: Is scope too large?
      - Output: Valid / Needs Refinement
   4. Check: Are all dependencies ready?
      - Output: Valid / Blocked
   5. Check: Is it implementation-ready?
      - Output: Valid / Needs Refinement
   6. Check: Would a new developer understand this issue?
      - Output: Valid / Needs Refinement

4. **Execute Scope Assessment**:
   1. Call `scope_size_estimator`.
   2. If estimate exceeds threshold → mark Needs Refinement.

5. **Execute Dependency Status Check**:
   1. Call `dependency_readiness_check`.
   2. If critical dependency unavailable → mark Blocked.

6. **Execute Clarity Assessment**:
   1. Call `/clarity-simulation`.
   2. If ambiguity detected → mark Needs Refinement.

7. **Execute Readiness Classification**: Determine final status:
   - If all checks = Valid → READY
   - If any Blocked → BLOCKED
   - If any Needs Refinement but no Blocked → NEEDS_REFINEMENT
   - If major structural elements missing → INCOMPLETE

8. Generate structured Validation Report: