# Agent Usage Examples

This document shows real examples of how to use the custom agents and what output to expect.

## Example 1: Issue Planning

**Scenario**: You have a new issue for adding a contact form to the website.

**Issue Description**:
```
Title: Add contact form to website
Body: We need a contact form so visitors can reach us. Should include name, email, and message fields.
```

**Agent Invocation**:
```
@copilot issue-planner.md
```

**Expected Output**:
```markdown
## Implementation Plan

### Overview
Create a new contact page with a form using Hugo, DaisyUI components, and Tailwind CSS styling. The form will collect name, email, and message from visitors.

### Complexity Assessment
Medium - Requires new page creation, form components, validation, and potentially backend integration for form submission.

### Prerequisites
- [ ] Hugo site is running locally
- [ ] DaisyUI and Tailwind are properly configured
- [ ] Decision on form backend (FormSpree, Netlify Forms, etc.)

### Implementation Steps
1. [ ] Create contact content file at `site/content/contact.md`
2. [ ] Create contact page template at `site/layouts/_default/contact.html` (or use existing layout)
3. [ ] Design form structure with name, email, and message fields
4. [ ] Apply DaisyUI form components (form-control, input, textarea, btn)
5. [ ] Add Tailwind responsive styling
6. [ ] Implement client-side validation (required fields, email format)
7. [ ] Configure form submission (choose backend service)
8. [ ] Add success/error message display
9. [ ] Test form across different devices
10. [ ] Add form to navigation menu

### Files to Modify
- `site/content/contact.md` - Create new page content
- `site/layouts/_default/contact.html` - Create/modify template
- `site/assets/css/input.css` - Add any custom styles (if needed)
- `site/config.yaml` - Add contact page to menu
- `site/static/js/form-validation.js` - Add validation script (if needed)

### Testing Strategy
- [ ] Verify all form fields render correctly
- [ ] Test required field validation
- [ ] Test email format validation
- [ ] Submit test form and verify it's received
- [ ] Test on mobile, tablet, and desktop viewports
- [ ] Check accessibility with keyboard navigation
- [ ] Verify error messages display correctly

### Potential Risks/Considerations
- **Spam**: Consider adding honeypot field or CAPTCHA
- **Privacy**: Add link to privacy policy if collecting user data
- **Backend Service**: Some services have submission limits on free tiers
- **Validation**: Client-side validation alone isn't secure - need backend validation too
- **Styling**: Ensure form matches overall site design

### Related Issues/PRs
- Consider creating follow-up issue for spam protection
- May relate to privacy policy documentation

### Recommended Approach
1. Start with basic HTML structure using DaisyUI
2. Get the layout right on all screen sizes
3. Add validation incrementally
4. Choose and configure backend service last
```

---

## Example 2: Task Delegation

**Scenario**: You want to know which parts of the contact form issue can be safely delegated.

**Agent Invocation**:
```
@copilot task-delegator.md
```

**Expected Output**:
```markdown
## Delegation Analysis for: Add Contact Form

### Task Breakdown

#### 🟢 Safe to Delegate (AI Agent Ready)

1. **Create Basic Form HTML Structure**
   - **Agent Instructions**: Create a contact form in `site/layouts/_default/contact.html` with name (text input), email (email input), and message (textarea) fields. Use DaisyUI form-control, input, textarea, and btn classes.
   - **Acceptance Criteria**: Form renders with all three fields, properly labeled, using DaisyUI styling
   - **Estimated Time**: 15-20 minutes
   - **Testing**: Open page locally and verify form displays correctly

2. **Add Tailwind Responsive Styling**
   - **Agent Instructions**: Make the contact form responsive using Tailwind classes. Stack vertically on mobile, optimize spacing for tablet/desktop. Use grid/flex utilities.
   - **Acceptance Criteria**: Form looks good on mobile (320px), tablet (768px), and desktop (1024px+)
   - **Estimated Time**: 20-30 minutes
   - **Testing**: Test in browser dev tools at various viewport sizes

3. **Create Contact Page Content**
   - **Agent Instructions**: Create `site/content/contact.md` with appropriate front matter, title "Contact Us", and brief introductory text about getting in touch.
   - **Acceptance Criteria**: Page has proper front matter, renders with Hugo, shows intro text above form
   - **Estimated Time**: 10 minutes
   - **Testing**: Verify page builds and displays intro content

#### 🟡 Delegate with Supervision

1. **Implement Client-Side Form Validation**
   - **Why Supervision Needed**: JavaScript validation logic needs to handle edge cases properly and provide good UX
   - **Review Checklist**: 
     - Verify email regex is appropriate
     - Check error messages are user-friendly
     - Ensure validation doesn't prevent submission
     - Test with various invalid inputs
   - **Estimated Time**: 30-45 minutes

2. **Add Success/Error Message Display**
   - **Why Supervision Needed**: Needs to integrate with form submission flow and handle various states
   - **Review Checklist**:
     - Messages are accessible (ARIA labels)
     - Styling matches site design
     - Messages clear automatically or can be dismissed
     - Works with chosen backend service
   - **Estimated Time**: 20-30 minutes

#### 🔴 Human Required

1. **Choose and Configure Form Backend Service**
   - **Why Human Needed**: Business decision - need to evaluate services (FormSpree, Netlify Forms, custom API, etc.), pricing, features, and integration approach
   - **Skills Required**: Understanding of form handling options, backend services, pricing models
   - **Estimated Time**: 1-2 hours (including research)

2. **Implement Spam Protection**
   - **Why Human Needed**: Security consideration - need to choose appropriate method (honeypot, CAPTCHA, rate limiting) based on expected traffic and user experience
   - **Skills Required**: Security best practices, user experience considerations
   - **Estimated Time**: 1-2 hours

### Recommended Approach

**Week 1 - Phase 1: Structure (Safe to Delegate)**
1. Delegate creation of basic form HTML structure
2. Delegate responsive styling
3. Delegate content page creation
4. Review and approve all three together

**Week 1 - Phase 2: Interaction (Supervise)**
5. Delegate client-side validation implementation
6. Review validation thoroughly with test cases
7. Delegate success/error message display
8. Review and test together

**Week 2 - Phase 3: Backend (Human)**
9. Research and choose form backend service
10. Configure chosen service
11. Consider spam protection strategy
12. Implement spam protection if needed

### Risk Mitigation

- **Start Simple**: Get basic form working before adding complexity
- **Test Incrementally**: Don't wait until everything is done to test
- **Backup Plan**: If chosen backend service doesn't work, have alternative ready
- **Rollback Strategy**: Keep form submission disabled until backend is fully configured and tested

### Confidence Building Note

This is a perfect issue to start building confidence in AI delegation:
- Clear, well-defined requirements
- Multiple independent tasks
- Safe to test in local environment
- Easy to verify results visually
- Low risk (it's a new feature, not modifying critical code)

**Recommendation**: Start by delegating just the HTML structure. Once you see good results, you'll feel comfortable delegating the styling and validation.
```

---

## Example 3: Code Review

**Scenario**: You've submitted a PR adding the contact form and want automated review.

**Agent Invocation** (in PR):
```
@copilot code-reviewer.md
```

**Expected Output**:
```markdown
## Code Review Summary

### Overall Assessment
Good implementation of the contact form! The code is clean and follows DaisyUI/Tailwind conventions. The form structure is solid. A few accessibility and validation concerns to address before merging.

### Critical Issues 🔴

None - no blocking issues found.

### Important Issues 🟡

#### Missing Form Labels
**File**: `site/layouts/_default/contact.html`
**Line**: 15-17
**Issue**: Input fields don't have associated `<label>` elements
**Why**: Screen readers need labels to announce form fields to users. This is a WCAG accessibility requirement.
**Suggestion**: Wrap inputs in DaisyUI form-control with proper labels:
```html
<div class="form-control">
  <label class="label" for="name">
    <span class="label-text">Your Name</span>
  </label>
  <input type="text" id="name" name="name" class="input input-bordered" required />
</div>
```

#### Email Validation Missing
**File**: `site/layouts/_default/contact.html`
**Line**: 18
**Issue**: Email input doesn't have HTML5 validation
**Why**: Basic validation helps catch mistakes before submission
**Suggestion**: Add `type="email"` and consider pattern validation:
```html
<input type="email" name="email" required pattern="[^@]+@[^@]+\.[^@]+" />
```

#### No Error Handling for Form Submission
**File**: `site/static/js/contact-form.js`
**Line**: 25
**Issue**: Form submission doesn't handle errors from the backend
**Why**: Users need feedback if submission fails (network error, service down, etc.)
**Suggestion**: Add catch block:
```javascript
.catch(error => {
  showMessage('error', 'Sorry, something went wrong. Please try again.');
  console.error('Form error:', error);
});
```

### Suggestions 🟢

#### Consider Honeypot for Spam Protection
The form is vulnerable to spam bots. Consider adding a honeypot field:
```html
<input type="text" name="honeypot" class="hidden" tabindex="-1" autocomplete="off" />
```
Then reject submissions where honeypot is filled.

#### Loading State for Submit Button
Add a loading state while form is submitting to prevent double-submissions:
```javascript
submitButton.disabled = true;
submitButton.textContent = 'Sending...';
// ... after response ...
submitButton.disabled = false;
submitButton.textContent = 'Send Message';
```

#### Responsive Padding Could Be Improved
On mobile, the form feels a bit cramped. Consider:
```html
<form class="space-y-4 p-4 md:p-6">
```

### What's Working Well ✅

- Excellent use of DaisyUI form components - consistent with site design
- Clean, readable code structure
- Proper use of semantic HTML elements (`<form>`, `<button type="submit">`)
- Responsive layout works well on most screen sizes
- Success message implementation is clear and user-friendly
- Good use of Tailwind utility classes

### Files Reviewed
- [x] `site/layouts/_default/contact.html` - Form structure (needs accessibility fixes)
- [x] `site/content/contact.md` - Content looks good
- [x] `site/static/js/contact-form.js` - Logic sound, needs error handling
- [x] `site/config.yaml` - Navigation updated correctly

### Recommended Actions
1. **Priority 1**: Add form labels for accessibility (Important)
2. **Priority 2**: Add email validation (Important)
3. **Priority 3**: Add error handling to JavaScript (Important)
4. **Optional**: Consider honeypot spam protection
5. **Optional**: Add loading state to button

Once these are addressed, this will be ready to merge! Great work on the implementation. 🚀
```

---

## Tips for Using Agents

1. **Be Specific**: The more context you provide in the issue, the better the agent's plan
2. **Iterate**: Use agent output as a starting point, then refine
3. **Combine Agents**: Use issue-planner first, then task-delegator to identify what to delegate
4. **Customize**: Edit the agent markdown files to match your workflow
5. **Learn**: Notice patterns in good agent output and incorporate them into your process

## Customizing Agent Behavior

If you want agents to behave differently, edit the respective `.md` file:

**Want more detailed plans?** → Edit `issue-planner.md`, add to "Guidelines" section:
```markdown
- Always include at least 10 implementation steps
- Break down each file change into separate steps
```

**Want stricter code reviews?** → Edit `code-reviewer.md`, add to "Critical Issues" section:
```markdown
- Any missing test coverage is critical
- All functions must have JSDoc comments
```

**Want different delegation categories?** → Edit `task-delegator.md`, modify the confidence levels or add new ones.

The agents are **yours to control and modify**. Experiment and find what works best for your team!
