# GitHub Copilot Agents Guide

This guide explains how to use and customize GitHub Copilot agents for the Rocket Starter Web project.

## What are GitHub Copilot Agents?

GitHub Copilot Agents are AI assistants that you can customize with specific instructions to help with various development tasks. They're defined using markdown files in the `.github/agents/` directory.

## Available Agents

### Issue Planner Agent (`issue-planner.md`)

**Purpose**: Analyzes GitHub issues and creates detailed, step-by-step implementation plans.

**When to use**:
- When you receive a new issue and need a structured approach
- Before starting work to understand the full scope
- To break down complex features into manageable tasks
- To estimate effort and identify dependencies

**How to use**:
1. Open a GitHub issue in your repository
2. Mention the agent in a comment: `@copilot issue-planner.md`
3. Or use the Copilot interface to invoke the agent on the issue
4. The agent will analyze the issue and provide a detailed implementation plan

**What you get**:
- Clear step-by-step breakdown of the work
- Complexity assessment
- Files that need to be modified
- Testing strategies
- Potential risks and considerations

## Customizing Agents

### How to Train Your Agents

Agents are **completely customizable** through their markdown files. You can:

1. **Edit Instructions**: Modify the agent's role and responsibilities
2. **Add Domain Knowledge**: Include project-specific context and patterns
3. **Define Output Format**: Specify exactly how you want responses structured
4. **Set Guidelines**: Add rules and best practices specific to your workflow
5. **Include Examples**: Add example interactions to guide behavior

### Customization Process

To customize an agent:

1. **Edit the markdown file** in `.github/agents/`
2. **Modify any section**:
   - Change the role description
   - Update guidelines
   - Add or remove responsibilities
   - Include project-specific context
3. **Save and commit** - Changes take effect immediately
4. **Test the agent** with a sample issue or task

### Creating New Agents

You can create new specialized agents for different tasks:

1. Create a new `.md` file in `.github/agents/`
2. Define the agent's purpose and role
3. Specify input/output format
4. Add relevant project context
5. Include guidelines and examples

**Agent Ideas**:
- `code-reviewer.md` - Reviews PRs with project-specific standards
- `documentation-writer.md` - Generates or updates documentation
- `bug-analyzer.md` - Analyzes bug reports and suggests fixes
- `test-writer.md` - Creates test cases for new features
- `security-auditor.md` - Reviews code for security issues

## Best Practices

### Writing Effective Agent Instructions

1. **Be Specific**: Clear, concrete instructions work better than vague ones
2. **Provide Context**: Include relevant project information and structure
3. **Use Examples**: Show the agent what good output looks like
4. **Iterate**: Start simple and refine based on results
5. **Test Thoroughly**: Try edge cases and different scenarios

### Agent Naming

- Use descriptive, kebab-case names (e.g., `issue-planner.md`)
- Name should reflect the agent's primary function
- Avoid generic names like `helper.md` or `assistant.md`

### Maintaining Agents

- **Review Regularly**: Update agents as your project evolves
- **Document Changes**: Note why you made specific instruction changes
- **Share Knowledge**: If an agent pattern works well, share it with the team
- **Version Control**: Use git to track agent evolution and revert if needed

## Example Workflow

Here's how you might use agents in your daily workflow:

1. **New Issue Created**:
   - Invoke `@copilot issue-planner.md` on the issue
   - Review the generated plan
   - Adjust or ask follow-up questions
   - Add the plan to the issue description or comments

2. **Ready to Code**:
   - Start implementation following the plan
   - Check off completed steps
   - Use Copilot for code completion

3. **Code Review**:
   - Use a `code-reviewer.md` agent (if created) to pre-review
   - Address automated feedback
   - Submit for human review

## Training Through Examples

Agents learn from the examples you provide in their instructions. To "train" an agent:

1. **Add Example Scenarios**: Include sample inputs and desired outputs
2. **Specify Edge Cases**: Show how to handle unusual situations
3. **Define Don'ts**: Explicitly state what the agent should avoid
4. **Provide Templates**: Give structured formats to follow

Example structure for training:
```markdown
## Example Interaction

**Input**: [Sample issue or task description]

**Expected Output**:
[Show exactly what you want the agent to produce]

**Key Points**:
- [What made this response good]
- [Specific patterns to follow]
```

## Limitations and Considerations

- Agents are **not autonomous** - they provide suggestions, you decide what to use
- Agents **don't have access to external systems** - they work with GitHub context
- Agent quality depends on **instruction clarity** - iterate on your prompts
- Agents are **tools to augment**, not replace, human judgment

## Getting Started

Start small:
1. Use the provided `issue-planner.md` agent on a few issues
2. Observe the output and note what works well
3. Edit the agent to improve areas that need refinement
4. Gradually add more agents as you identify workflow needs

Remember: **You have complete control** over your agents. They're just markdown files that you can modify, version control, and evolve as your needs change.

## Questions or Issues?

If you have questions about using or customizing agents, open an issue in the repository with the `question` label.
