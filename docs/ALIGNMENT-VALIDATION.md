# Alignment Validation Workflow

## Description
Performs a strategic validation of the defined Problem against Product Context.

This workflow ensures:
- The issue aligns with product vision and business model.
- The scope is strategically coherent.
- The issue does not conflict with existing features or roadmap items.
- The issue does not duplicate existing work.
- The initiative is proportionate to roadmap priorities.

This workflow does NOT evaluate technical feasibility.

---

### Placeholder Workflows:
* **Vision Consistency Check**
* **Business Model Validation**
* **Scope Coherence Assessment**
* **Conflict Detection**
* **Strategic Classification**

---

### Internal Steps:
1. **Load Problem Definition**: Retrieve validated Problem output.
2. **Load Product Context**: Pull relevant Product MCP resources.
3. **Validate Vision Alignment**: Ensure alignment with product mission and strategic pillars.
4. **Validate Business Model Consistency**: Confirm compatibility with monetization and positioning.
5. **Assess Strategic Scope**: Detect oversized initiatives.
6. **Detect Conflicts or Duplicates**: Compare against roadmap and existing issues.
7. **Classify Strategic Alignment Status**.
8. **Produce Alignment Report**.

---

## Product Context MCP
  * Tools:
    * `check_roadmap_alignment`
    * `validate_against_vision`
    * `detect_duplicate_feature`
    * `conflict_detection`
    * `business_model_consistency_check`
  * Resources
    * `product_vision.md`
    * `roadmap_2026`
    * `feature_definitions`
    * `business_model.md`
    * `open_issues_index`
  * Prompts
    * `/impact-analysis`
    * `/strategic-scope-review`

## Alignment Report
```md
Alignment Validation Report

Vision Alignment: {Aligned / Partial / Misaligned}
Business Model Impact: {None / Supportive / Risk / Conflict}
Strategic Scope: {Appropriate / Oversized / Underspecified}
Conflict Analysis: {None / Duplicate / Overlap / Contradiction}
Final Classification
STRATEGICALLY_ALIGNED /
ALIGNED_WITH_REFINEMENT_REQUIRED /
DUPLICATE /
MISALIGNED /
REQUIRES_ROADMAP_UPDATE

Recommended Action
	•	Proceed
	•	Refine Scope
	•	Merge with Existing Issue
	•	Escalate for Roadmap Review
	•	Reject
```

## Workflow:

1. A trigger is received indicating execution of **Alignment Validation** workflow.
2. Load validated Problem Definition from session state.
3. Load Product Context MCP resources.
4. **Execute Vision Consistency Check**:
   1. Call `validate_against_vision`.
   2. Determine:
      - Aligned
      - Partially Aligned
      - Misaligned
5. **Execute Business Model Validation**:
   1. Call `business_model_consistency_check`.
   2. Evaluate:
      - Does it support revenue model?
      - Does it introduce risk to compliance or positioning?
      - Does it affect pricing tiers?
6. **Execute Scope Coherence Assessment**:
   1. Call `/strategic-scope-review`.
   2. Determine:
      - Appropriately Scoped
      - Oversized (should be epic)
      - Underspecified
7. **Execute Conflict Detection**:
   1. Call `detect_duplicate_feature`.
   2. Call `conflict_detection`.
   3. Determine:
      - No Conflict
      - Duplicate
      - Partial Overlap
      - Contradiction
8. **Execute Strategic Classification**: Determine final alignment status:
   - STRATEGICALLY_ALIGNED
   - ALIGNED_WITH_REFINEMENT_REQUIRED
   - DUPLICATE
   - MISALIGNED
   - REQUIRES_ROADMAP_UPDATE
9. Generate structured Alignment Report.
10. Return Alignment Report to parent Planning/Refinement workflow.
11. Parent workflow decision rules:
   - STRATEGICALLY_ALIGNED → Proceed to Technical Review
   - ALIGNED_WITH_REFINEMENT_REQUIRED → Return to Problem Definition
   - DUPLICATE → Suggest merge and stop
   - MISALIGNED → Stop session
   - REQUIRES_ROADMAP_UPDATE → Escalate and pause