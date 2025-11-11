# Quick Start: Using Custom Agents

## TL;DR - Answer to Your Questions

**Q: Can I train agents with custom prompts?**  
**A: YES!** Agents are just markdown files in `.github/agents/`. Edit them to customize behavior.

**Q: Are agents out of my hands?**  
**A: NO!** You have **complete control**. Agents are files you own, edit, and version control.

**Q: Can agents add step-by-step plans to issues?**  
**A: YES!** Use the `issue-planner.md` agent to analyze issues and generate detailed plans.

**Q: Can I delegate tasks to agents?**  
**A: YES!** Use the `task-delegator.md` agent to identify which tasks are safe to delegate.

---

## How to Use Agents (3 Steps)

### Step 1: Invoke an Agent
In any GitHub issue or PR, mention the agent:
```
@copilot issue-planner.md
```

Or use the Copilot interface to select an agent.

### Step 2: Review the Output
The agent will analyze the issue and provide structured output (plans, suggestions, etc.)

### Step 3: Use or Refine
- Use the output as-is, or
- Ask follow-up questions, or  
- Edit the agent file to improve future responses

---

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `issue-planner.md` | Creates step-by-step implementation plans | New issues, before starting work |
| `task-delegator.md` | Identifies which tasks to delegate | Want to delegate work to AI/juniors |

---

## Customizing Agents (2 Minutes)

1. **Open** `.github/agents/[agent-name].md`
2. **Edit** any section (instructions, examples, guidelines)
3. **Save** and commit
4. **Test** - invoke the agent to see changes

That's it! Changes take effect immediately.

---

## Example: Planning an Issue

**Before** (vague issue):
```
Issue #42: Add contact page
Body: We need a contact page
```

**After** (using issue-planner.md):
```markdown
## Implementation Plan

### Overview
Create a new contact page with form using Hugo and DaisyUI components

### Complexity Assessment
Medium - Involves new page creation, form components, and basic validation

### Implementation Steps
1. [ ] Create content file: `site/content/contact.md`
2. [ ] Design form layout using DaisyUI form components
3. [ ] Add Tailwind styling for responsive design
4. [ ] Implement client-side validation
5. [ ] Configure form submission endpoint
6. [ ] Add success/error messaging
7. [ ] Test across devices

### Files to Modify
- `site/content/contact.md` - Create new content file
- `site/layouts/_default/contact.html` - Create template
- `site/assets/css/input.css` - Add custom styles if needed

### Testing Strategy
- [ ] Test form validation with invalid inputs
- [ ] Verify responsive design on mobile/tablet
- [ ] Test form submission flow
- [ ] Check accessibility with screen readers

[...]
```

Now the issue is **actionable** with clear steps!

---

## Building Confidence

Start here:
1. ✅ Use `issue-planner.md` on 2-3 existing issues
2. ✅ Review the plans - adjust the agent if needed
3. ✅ Use `task-delegator.md` to identify safe tasks
4. ✅ Delegate one small task to Copilot
5. ✅ Review the work and provide feedback

**After 1 week**: You'll know what works and how to customize agents for your workflow.

---

## Pro Tips

💡 **Tip 1**: Agents are just instructions. Be specific about what you want.

💡 **Tip 2**: Include project-specific patterns in agent files (e.g., "Always use DaisyUI components")

💡 **Tip 3**: Create agents for repetitive tasks (code review checklist, release notes, etc.)

💡 **Tip 4**: Use version control to experiment - commit working agents, revert if something doesn't work

💡 **Tip 5**: Start conservative, build confidence gradually

---

## Need Help?

- 📖 Read the full guide: `.github/agents/README.md`
- 💬 Ask questions by opening an issue
- 🔧 Edit agent files directly to customize behavior

**Remember**: You're in control. Agents are tools you own and customize to fit your workflow.
