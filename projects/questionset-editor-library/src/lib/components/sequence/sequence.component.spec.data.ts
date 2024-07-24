export const mockQuestionData = {
    "mimeType": "application/vnd.sunbird.question",
    "media": [],
    "editorState": {
        "options": [
            {
                "value": {
                    "body": "<p>One</p>",
                    "value": 0
                }
            },
            {
                "value": {
                    "body": "<p>Two</p>",
                    "value": 1
                }
            },
            {
                "value": {
                    "body": "<p>Three</p>",
                    "value": 2
                }
            },
            {
                "value": {
                    "body": "<p>Four</p>",
                    "value": 3
                }
            }
        ],
        "question": "<p>Arrange the numbers in ASC orders</p>",
        "solutions": [
            {
                "id": "49b60669-5e6f-44a0-bc99-8213f683bbdf",
                "type": "html",
                "value": "<p>Correct order is 1,2,3,4</p>"
            }
        ]
    },
    "templateId": "asq-vertical",
    "answer": "<div class='answer-container'><div class='answer-body'><p>One</p></div><div class='answer-body'><p>Two</p></div><div class='answer-body'><p>Three</p></div><div class='answer-body'><p>Four</p></div></div>",
    "complexityLevel": [],
    "maxScore": 1,
    "interactions": {
        "response1": {
            "type": "order",
            "options": [
                {
                    "label": "<p>One</p>",
                    "value": 0
                },
                {
                    "label": "<p>Two</p>",
                    "value": 1
                },
                {
                    "label": "<p>Three</p>",
                    "value": 2
                },
                {
                    "label": "<p>Four</p>",
                    "value": 3
                }
            ]
        }
    },
    "solutions": {
        "49b60669-5e6f-44a0-bc99-8213f683bbdf": "<p>Correct order is 1,2,3,4</p>"
    },
    "hints": {},
    "responseDeclaration": {
        "response1": {
            "cardinality": "ordered",
            "type": "integer",
            "correctResponse": {
                "value": [
                    0,
                    1,
                    2,
                    3
                ]
            },
            "mapping": [
                {
                    "value": 0,
                    "score": 0.25
                },
                {
                    "value": 1,
                    "score": 0.25
                },
                {
                    "value": 2,
                    "score": 0.25
                },
                {
                    "value": 3,
                    "score": 0.25
                }
            ]
        }
    },
    "primaryCategory": "Arrange Sequence Question",
    "name": "ASQ",
    "outcomeDeclaration": {
        "maxScore": {
            "cardinality": "ordered",
            "type": "integer",
            "defaultValue": 1
        },
        "hint": {
            "cardinality": "ordered",
            "type": "string",
            "defaultValue": "a392a004-6167-4ae8-8ec1-a456c7351ed1"
        }
    },
    "interactionTypes": [
        "order"
    ],
    "qType": "ASQ",
    "body": "<div class='question-body' tabindex='-1'><div class='asq-title' tabindex='0'><p>Arrange the numbers in ASC orders</p></div><div data-order-interaction='response1' class='asq-vertical'></div></div>",
    "createdBy": "5a587cc1-e018-4859-a0a8-e842650b9d64",
    "board": "State(Tamil Nadu)",
    "medium": [
        "English"
    ],
    "gradeLevel": [
        "Class 1"
    ],
    "subject": [
        "Accountancy"
    ],
    "author": "contentCreator",
    "channel": "0137541424673095687",
    "framework": "tn_k-12",
    "copyright": "sunbird",
    "audience": [
        "Student"
    ],
    "license": "CC BY 4.0",
    "identifier": "do_11406399576154112013"
}

export const editorOptionData = {
    "question": "<p>arrange the nunbers</p>",
    "options": [
        {
            "body": "<p>1</p>",
            "length": 1
        },
        {
            "body": "<p>2</p>",
            "length": 1
        },
        {
            "body": "<p>3</p>",
            "length": 1
        },
        {
            "body": "<p>4</p>",
            "length": 1
        }
    ],
    "templateId": "asq-vertical"
}