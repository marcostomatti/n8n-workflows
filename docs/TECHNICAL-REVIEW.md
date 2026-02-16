# Technical Review Workflow

## Description
Evaluates the defined Problem from a technical and architectural perspective.

This workflow ensures:
- Architectural impact is identified.
- System boundaries are respected.
- Risks are documented.
- Dependencies and migrations are clarified.
- A preliminary testing strategy is proposed.
- A pessimistic estimation is generated.

This workflow does NOT redefine the problem or change business scope.

---

### Placeholder Workflows:
* **Impact Classification**
* **Architecture Analysis**
* **Risk Identification**
* **Testing Strategy Derivation**
* **Estimation Draft**
* **Technical Validation Gate**

---

### Internal Steps:
1. **Load Problem Definition**: Retrieve validated Problem output.
2. **Classify Impact Area**: Determine affected system layers.
3. **Analyze Architectural Impact**: Identify modules, services, infra changes.
4. **Evaluate Compliance & Constraints**: Check architectural implications.
5. **Identify Dependencies & Migrations**: Detect schema changes, integrations, versioning impacts.
6. **Generate Risk List**: Enumerate technical uncertainties.
7. **Derive Testing Strategy**: Suggest test types and coverage areas.
8. **Generate Pessimistic Estimate**: Provide conservative story point estimate.
9. **Validate Technical Completeness**: Ensure no critical area is unassessed.
10. **Produce Structured Technical Output**.

---

## Best Practices MCP
  * Tools:
    * `identify_affected_modules`
    * `suggest_architecture_impact`
    * `dependency_analysis`
    * `migration_detection`
    * `risk_pattern_detection`
  * Resources
    * `architecture_overview.md`
    * `repo_structure.json`
    * `coding_standards.md`
    * `security_guidelines.md`
    * `testing_guidelines.md`
  * Prompts
    * `/generate_technical_checklist`
    * `/test-plan`
    * `/estimation-assist`

## Technical Review structure:
- Considerations: {System layers affected + architectural notes}
- Dependencies: {Internal/External dependencies}
- Migrations: {None / Required + description}
- Assessed Risks: {List of potential issues}
- Testing Strategy: {UT / E2E / Storybook / Manual / None}
- Estimation: Pessimistic story points + uncertainty note

---

## Workflow:

1. A trigger is received indicating execution of **Technical Review** workflow.
2. Load validated Problem Definition from session state.
3. **Execute Impact Classification**:
   1. Prompt:
      - Is this backend, frontend, infra, or multiple?
      - Does it impact compliance (GDPR, AUTH, T&C, etc)?
      - Is this net-new component or modification?
4. **Execute Architecture Analysis**:
   1. Call `identify_affected_modules`.
   2. Call `suggest_architecture_impact`.
   3. Prompt:
      - Are migrations required?
      - Does it introduce new dependencies?
      - Does it affect authentication, permissions, billing, or external integrations?
5. **Execute Dependency & Migration Evaluation**:
   1. Call `dependency_analysis`.
   2. Call `migration_detection`.
   3. If migrations required → flag as HIGH RISK.
6. **Execute Risk Identification**:
   1. Call `risk_pattern_detection`.
   2. Prompt:
      - Are unknowns present?
      - Do we need to run a spike?
      - Are performance implications expected?
   3. Compile structured Risk List.
7. **Execute Testing Strategy Derivation**:
   1. Call `/test-plan`.
   2. Suggest:
      - Unit tests
      - Integration tests
      - E2E tests
      - Performance tests
      - Security tests
8. **Execute Estimation Draft**:
   1. Call `/estimation-assist`.
   2. Generate pessimistic story point estimate.
   3. If high uncertainty → add spike recommendation.
9. **Execute Technical Validation Gate**:
   1. Ensure impact area defined.
   2. Ensure dependencies clarified.
   3. Ensure risks documented.
   4. Ensure test strategy exists.
   5. If incomplete → return to Architecture Analysis step.
10. Fill in the template for Technical Review data structure. 
11. Mark Technical Review as COMPLETE.
12. Return structured output to parent Planning/Refinement workflow.