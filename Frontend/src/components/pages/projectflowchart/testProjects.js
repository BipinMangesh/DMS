export const projects=[
  {
    "projectId": 1,
    "projectName": "SM2201 - VESSEL SAFETY CASE",
    "elements": [
      {
        "id": 1,
        "type":"customnode",
        position: { x: 300, y: 0 },
        "data":{          
        "activity": "PUSB receive ETSR auto notification email from BSP",        
        "activityOwner": "Mohamad Safwan Bin",
        "started": "02/20/2021",
        "completionDate": "02/20/2021",
        "targetDate": "02/20/2021"
        }
      },
      {
        "id": 2,
        "type":"customnode",
        position: { x: 300, y: 250 },
        data:{
        "activity": "PUSB ETSR Focal point forward the details to Project Manager and Planner.",
        
        "activityOwner": "Muhammad Azizul Bin",
        "started": "03/20/2021",
        "completionDate": "",
        "targetDate": "06/20/2022"
        }
      },
      {
        "id": 3,
        "type":"customnode",
        position: { x: 300, y: 500 },
        "data":{
        "activity": "PUSB Project Manager to assign PE and initiate the project.",
        
        "activityOwner": "Muhd Zihnie Bin",
        "started": "",
        "completionDate": "",
        "targetDate": ""
        }
      },
      {
        "id": 4,
        "type":"customnode",
        position: { x: 300, y: 750 },
        data:{
        "activity": "Issue approved Project Initiation Note (PIN)",
        
        "activityOwner": "Siti Majidah Bte",
        "started": "01/10/2022",
        "completionDate": "",
        "targetDate": "01/20/2022"
        }
      },
      { id: 'e1-1', source: '1', target: '2'},
      { id: 'e1-2', source: '2', target: '3'},
      { id: 'e1-3', source: '3', target: '4'}
    ]
  },
  {
    projectId: 2,
    "projectName": "BNP1202 - FRAME DESIGN AND METHOD OF INSTALLATION",
    "elements": [
      {
        "id": 1,
        "type":"customnode",
        position: { x: 300, y: 0 },
        data:{
        "activity": "PUSB receive ETSR auto notification email from BSP",        
        "activityOwner": "Mohamad Safwan Bin",
        "started": "",
        "completionDate": "02/20/2021",
        "targetDate": ""
        }
      },
      {
        "id": 2,
        "type":"customnode",
        position: { x: 300, y: 250 },
        data:{
        "activity": "PUSB ETSR Focal point forward the details to Project Manager and Planner.",
        
        "activityOwner": "Muhammad Azizul Bin",
        "started": "03/10/2021",
        "completionDate": "",
        "targetDate": "03/20/2021"
        }
      },
      {
        "id": 3,
        "type":"customnode",
        position: { x: 300, y: 550 },
        data:{
        "activity": "PUSB Project Manager to assign PE and initiate the project.",
        
        "activityOwner": "Muhd Zihnie  Bin",
        "started": "",
        "completionDate": "",
        "targetDate": ""
        }
      },
      {
        "id": 4,
        "type":"customnode",
        position: { x: 300, y: 750 },
        data:{
        "activity": "Issue approved Project Initiation Note (PIN)",        
        "activityOwner": "Siti Majidah Bte",
        "started": "05/20/2021",
        "completionDate": "",
        "targetDate": "05/20/2022"
        }
      },
      { id: 'e1-1', source: '1', target: '2'},
      { id: 'e1-2', source: '2', target: '3'},
      { id: 'e1-3', source: '3', target: '4'}
    ]
  },
  {
    "projectId": 3,
    "projectName": "OEP904SC04 - CWWJ02 GASLIFT SUPPLY PH.2",
    "elements": [
      {
        "id": 1,
        "type":"customnode",
        position: { x: 300, y: 0 },
        data:{
        "activity": "PUSB receive ETSR auto notification email from BSP",        
        "activityOwner": "Mohamad Safwan Bin",
        "started": "",
        "completionDate": "02/20/2021",
        "targetDate": ""
        }
      },
      {
        "id": 2,
        "type":"customnode",
        position: { x: 300, y: 250 },
        data:{
        "activity": "PUSB ETSR Focal point forward the details to Project Manager and Planner.",
        
        "activityOwner": "Muhammad Azizul Bin",
        "started": "02/20/2021",
        "completionDate": "",
        "targetDate": "03/20/2022"
        }
      },
      {
        "id": 3,
        "type":"customnode",
        position: { x: 300, y: 550 },
        data:{
        "activity": "PUSB Project Manager to assign PE and initiate the project.",
        
        "activityOwner": "Muhd Zihnie  Bin",
        "started": "02/20/2021",
        "completionDate": "",
        "targetDate": "04/20/2021"
        }
      },
      {
        "id": 4,
        "type":"customnode",
        position: { x: 300, y: 750 },
        data:{
        "activity": "Issue approved Project Initiation Note (PIN)",
        
        "activityOwner": "Siti Majidah Bte",
        "started": "",
        "completionDate": "",
        "targetDate": ""
        }
      },
      { id: 'e1-1', source: '1', target: '2'},
      { id: 'e1-2', source: '2', target: '3'},
      { id: 'e1-3', source: '3', target: '4'}
    ]
  }
];