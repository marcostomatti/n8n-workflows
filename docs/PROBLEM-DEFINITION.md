# Problem Definition Workflow

## Description
Produces a validated **Problem section** for an Issue from a business/product perspective.

This workflow ensures:
- The problem is clearly defined (not solution-oriented).
- The affected persona is identified.
- Business/user impact is measurable.
- Roadmap and vision alignment is validated.
- Scope classification is explicit.
- The problem is sufficiently structured to allow derivation of acceptance criteria later.

> **IMPORTANT** - This workflow does NOT include technical considerations.

### Placeholder Workflows:
* **Issue Type Classification**
* **Problem Framing Interaction**
* **Alignment Validation**
* **Problem Validation Gate**

### Internal Steps:
1. **Classify Issue Type**: Identify whether this is a new feature, bug, technical debt, compliance issue, UX improvement, or infrastructure/scaling change.
2. **Prompt Interaction Loop**: Collect structured answers to problem-framing questions.
3. **Detect Solution Bias**: If the user proposes a solution instead of describing the problem, redirect to problem clarification.
4. **Alignment Check**: Validate roadmap and vision alignment via Product Context MCP.
5. **Validate Completeness**: Ensure required fields are present and measurable.
6. **Generate Structured Problem Output**: Produce formatted Problem section output.
7. **Mark Status**: Set Problem Definition as VALID or INCOMPLETE.

## Product Context MCP
  * Tools:
    * `check_roadmap_alignment`
    * `validate_against_vision`
    * `detect_duplicate_feature`
    * `generate_user_story` (optional later use)
  * Resources
    * `product_vision.md`
    * `roadmap_2026`
    * `feature_definitions`
    * `customer_personas`
  * Prompts
    * `/refine-requirement`
    * `/impact-analysis`


## Problem data structure:
- Problem: {Title}
- Description: {Clear problem statement}
- User Persona: {Persona Name + Context}
- Impact: {Business/User impact}
- Scope Classification: {Type + Net-new/Iteration}
- Roadmap Alignment: {Aligned / Exception + explanation}
- Assets: {Links/Attachments}


## Workflow:

1. A trigger is received indicating execution of **Problem Definition** workflow.
2. Load relevant Product Context MCP resources.
3. **Execute Issue Type Classification**:
   1. Prompt user to classify issue:
      - New Feature
      - Production Bug
      - Technical Debt
      - Compliance Requirement
      - UX Improvement
      - Infrastructure/Scaling
4. **Execute Problem Framing Interaction**:
   1. Prompt user:
      1. What user problem are we solving?
      2. Which persona is affected?
      3. When/where does this occur?
      4. What happens if we do nothing?
      5. Is this roadmap-aligned?
      6. Is this net-new or iteration?
      7. Are designs/assets available?
   2. If vague language is detected → request clarification.
   3. If solution-oriented language is detected → redirect to problem framing.
5. **Execute Alignment Validation**:
   1. Call `check_roadmap_alignment`.
   2. Call `validate_against_vision`.
   3. Call `detect_duplicate_feature`.
   4. If misaligned → prompt user to confirm exception or adjust scope.
6. **Execute Problem Validation Gate**:
   1. Ensure persona is defined.
   2. Ensure impact is measurable or clearly described.
   3. Ensure compliance relevance is clarified.
   4. Ensure scope is not technical or implementation-specific.
   5. If any validation fails → return to Prompt Interaction Loop.
7. Fill in the template for Problem data structure.
8. Mark Problem Definition as VALID.
9. Return structured output to parent Planning/Refinement workflow.
