# Interview Question Generation Prompt for Gemini

## Instructions
Generate 50 technical interview questions and comprehensive answers for the [CATEGORY_NAME] role. Follow this exact format and structure.

## Requirements
- Create practical, scenario-based questions
- Use universal enterprise terminology (avoid military/government specific terms)
- Each answer should be 150-250 words
- Focus on real-world troubleshooting and problem-solving

## Terminology Guidelines
Use these universal terms:
- "enterprise facility" (not federal building)
- "secure campus" (not military base)
- "restricted access area" (not classified space)
- "compliance requirements" (not specific regulations)
- "identity management system" (not CAC cards)
- "security protocols" (not clearance requirements)
- "technical documentation" (not government forms)

## Required Structure

### ENTRY LEVEL (Questions 1-15)
Focus on:
- Basic troubleshooting procedures
- Customer service skills
- Documentation practices
- Safety protocols
- Tool usage
- Communication with end users

### MID LEVEL (Questions 16-30)
Focus on:
- Advanced troubleshooting
- System administration
- Security implementation
- Cross-team coordination
- Incident management
- Performance optimization

### SENIOR LEVEL (Questions 31-40)
Focus on:
- Infrastructure design
- Team leadership
- Project management
- Vendor relations
- Budget considerations
- Process improvement

### EXPERT LEVEL (Questions 41-50)
Focus on:
- Enterprise architecture
- Strategic planning
- Risk assessment
- Business continuity
- Innovation initiatives
- Mentoring programs

## Output Format
```typescript
{
  question: "Exact question text here",
  answer: "Comprehensive answer including: Initial assessment steps, specific actions to take, tools or commands to use, expected outcomes, follow-up procedures, and documentation requirements."
},
```

## Category-Specific Focus Areas

### For HELPDESK:
- Password resets and account management
- Hardware troubleshooting
- Software installation issues
- Network connectivity problems
- Printer and peripheral support
- Remote user assistance
- Ticket management
- Service desk metrics

### For ISP:
- Customer premise equipment
- Bandwidth management
- Service provisioning
- Network diagnostics
- QoS configuration
- DNS and DHCP issues
- Customer education
- Service level agreements

### For OSP (Outside Plant):
- Cable installation (aerial and underground)
- Fiber splicing procedures
- Safety regulations
- Equipment operation
- Right-of-way management
- Emergency restoration
- Plant documentation
- Weather-related challenges

### For NETWORK:
- Router and switch configuration
- VLAN management
- Firewall rules
- VPN setup
- Network monitoring
- Performance tuning
- Security hardening
- Disaster recovery

### For SYSTEMS:
- Server administration
- Virtualization platforms
- Backup strategies
- Patch management
- Active Directory
- Storage solutions
- Monitoring tools
- Automation scripts

### For FIBER:
- Fusion splicing techniques
- OTDR testing
- Connector types
- Loss calculations
- Cable management
- Testing procedures
- Troubleshooting methods
- Installation standards

## Example Question Format

```typescript
{
  question: "You're supporting a large enterprise campus with multiple buildings. Users in Building A report intermittent network connectivity issues that seem to occur during peak hours. How would you diagnose and resolve this issue?",
  answer: "I would begin with a systematic approach to identify the root cause. First, I'd check the network monitoring tools for bandwidth utilization patterns during peak hours, looking for congestion indicators. Next, I'd review switch and router logs for errors or port flapping in Building A's network equipment. I would run continuous ping tests from affected workstations to identify packet loss patterns and use traceroute to pinpoint where delays occur. The issue likely indicates network congestion or a failing switch under load. I'd check for duplex mismatches, verify QoS settings aren't limiting traffic incorrectly, and examine if any scheduled tasks coincide with the issues. Solutions might include implementing traffic shaping, upgrading network links, replacing aging equipment, or redistributing VLANs to balance load. I'd document all findings, implement the fix during a maintenance window, and monitor for 48 hours to ensure resolution. Finally, I'd create a knowledge base article for future reference and update network capacity planning documentation."
},
```

## Important Notes
1. Make questions progressively harder within each tier
2. Include specific technical details in answers
3. Mention relevant tools/software generically (don't use proprietary names)
4. Each answer should demonstrate complete problem-solving methodology
5. Avoid yes/no questions - focus on "how would you" scenarios
6. Include soft skills like communication and documentation in answers

---

# HOW TO USE THIS PROMPT:

1. Copy this entire prompt
2. Replace [CATEGORY_NAME] with one of: Helpdesk, ISP, OSP, Network, Systems, or Fiber
3. Paste into Gemini
4. Ask Gemini to generate all 50 questions following this format
5. Copy the output and paste into the interview-data.ts file

## Sample Gemini Prompt:
"Using the structure and requirements provided, generate 50 technical interview questions and answers for the Helpdesk role. Follow the exact format specified with Entry Level (1-15), Mid Level (16-30), Senior Level (31-40), and Expert Level (41-50) questions."