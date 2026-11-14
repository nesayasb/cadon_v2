type OfferingDetail = {
  introduction:string;
  focus:Array<{title:string;text:string}>;
  examples:Array<{title:string;text:string}>;
  outputs:string[];
  startingPoint:string;
};

export const OFFERING_DETAILS:Record<string,OfferingDetail> = {
  "data-analytics":{
    introduction:"A clearer view of your business starts with data you can use. We help you organise information, connect it across systems and turn it into reporting that supports everyday decisions.",
    focus:[
      {title:"Data foundations",text:"Bring information from spreadsheets, applications and databases into a consistent structure. Define ownership, quality checks and the transformations needed to make it usable."},
      {title:"Pipelines & integration",text:"Build repeatable flows that collect, clean and combine data. Replace manual consolidation with documented processing and checks that help your team spot issues."},
      {title:"Analytics & reporting",text:"Translate business questions into useful measures, dashboards and analyses. Agree on what an indicator means and how it should guide action."},
    ],
    examples:[
      {title:"One view of business performance",text:"Combine CRM and operational data into a dashboard with agreed definitions for pipeline, activity and service performance. Make it easier for teams to work from the same information."},
      {title:"Reporting without repeated spreadsheet work",text:"Map a recurring report, connect its sources and automate the preparation. Keep validation steps and a clear way to investigate missing or unexpected data."},
    ],
    outputs:["A map of the agreed data sources and definitions","Documented pipelines and data quality checks","Reporting or dashboards aligned with your questions","A handover covering operation, ownership and maintenance"],
    startingPoint:"Bring a report that takes too long, inconsistent figures or information scattered across tools. We will identify the data and decisions the first project should support.",
  },
  "ai-automation":{
    introduction:"Useful AI fits into a real process. We help you identify where an assistant, a predictive model or automation can support your team, then build and evaluate a solution around that task.",
    focus:[
      {title:"AI assistants & knowledge",text:"Create assistants that work with your approved documents and information. Define source references, boundaries and a handoff when the system cannot answer reliably."},
      {title:"Workflow automation",text:"Connect recurring steps across your tools, from classifying a request to preparing a response or updating a record. Keep review and approval where the process needs them."},
      {title:"Machine learning & evaluation",text:"Explore prediction or classification when your data supports it. Compare against a practical baseline and evaluate performance, failure cases and operational usefulness."},
    ],
    examples:[
      {title:"An assistant for recurring questions",text:"Use approved service documents to prepare answers on a website or messaging channel, capture the next step and route complex enquiries to a person."},
      {title:"From incoming request to prepared task",text:"Classify an incoming message, extract the agreed fields and prepare a CRM update for staff review. Build explicit checks for incomplete or ambiguous information."},
    ],
    outputs:["A defined use case and evaluation criteria","A working assistant, model or automated workflow","Documented integrations, limits and review points","Test results and guidance for your team"],
    startingPoint:"Bring a repetitive task, recurring customer questions or a prediction you would like to explore. We will assess the available information and whether AI is useful for the problem.",
  },
  "digital-it":{
    introduction:"Your tools should support the way your business works. We design and build websites, applications and integrations around your users, processes and existing technology.",
    focus:[
      {title:"Websites & digital products",text:"Create a clear online experience for customers or staff. Define the content, user journeys and functionality, then build an interface that works across screen sizes."},
      {title:"Business applications & CRM",text:"Turn operational requirements into a practical portal, internal tool or CRM workflow. Establish the roles, records and actions your team needs."},
      {title:"APIs & system integration",text:"Connect applications so information can move through an agreed process. Define the data exchanged, permissions, error handling and responsibilities for each integration."},
    ],
    examples:[
      {title:"A connected customer enquiry journey",text:"Bring an enquiry from your website into the appropriate CRM workflow, with clear ownership and the context needed for follow-up."},
      {title:"An internal operations portal",text:"Give staff a place to track requests, review documents and update status. Design the workflow around your team’s roles and existing systems."},
    ],
    outputs:["An agreed user journey and functional scope","A working website, application or integration","Documented access rules and operational requirements","Deployment and handover documentation"],
    startingPoint:"Bring an outdated website, disconnected systems or a process your current software does not support well. We will scope a useful first version and the integrations it needs.",
  },
  "strategy-transformation":{
    introduction:"A technology roadmap starts with business priorities. We help you understand your current position, choose useful investments and turn a broad ambition into a sequence of achievable projects.",
    focus:[
      {title:"Current-state assessment",text:"Review your workflows, data, applications and team needs. Identify dependencies, constraints and the problems that make change worthwhile."},
      {title:"Data, AI & IT roadmaps",text:"Prioritise opportunities by business value, feasibility and effort. Define what to test first, what foundations are needed and what success should look like."},
      {title:"Architecture & adoption",text:"Outline how the solution should fit into your systems and operating model. Plan ownership, team involvement and the steps needed for people to use it."},
    ],
    examples:[
      {title:"From AI ambition to a scoped pilot",text:"Work with stakeholders to identify opportunities, assess the available information and select a first project with clear evaluation criteria."},
      {title:"A roadmap for connected operations",text:"Map data and process gaps across existing tools, then sequence improvements so each project builds on the right foundations."},
    ],
    outputs:["A current-state assessment and prioritised opportunities","A practical roadmap with dependencies and decision points","A scoped first project and success criteria","Recommendations for ownership, architecture and adoption"],
    startingPoint:"Bring your business objectives and the changes you are considering. You do not need a finished technical brief; we will structure the questions and next decisions together.",
  },
};
