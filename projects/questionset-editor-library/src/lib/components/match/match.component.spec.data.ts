export const mockOptionData = {
  editorOptionData: {
    question: "<p>Match the pairs?</p>",
    options: [
      {
        left: "<p>2</p>",
        right: "<p>even</p>",
      },
      {
        left: "<p>3</p>",
        right: "<p>odd</p>",
      },
    ],
    templateId: "mtf-vertical",
    correctMatchPair: [
      {
          "lhs": 0,
          "rhs": 0
      },
      {
          "lhs": 1,
          "rhs": 1
      }
    ],
    numberOfOptions: 4,
  },
  prepareMtfBody: {
    templateId: "mtf-horizontal",
    name: "Match The Following Question",
    responseDeclaration: {
      "response1": {
          "cardinality": "ordered",
          "type": "map",
          "correctResponse": {
              "value": [
                  {
                      "lhs": 0,
                      "rhs": 0
                  },
                  {
                      "lhs": 1,
                      "rhs": 1
                  }
              ]
          },
          "mapping": [
              {
                  "value": {
                      "lhs": 0,
                      "rhs": 0
                  },
                  "score": 0.5
              },
              {
                  "value": {
                      "lhs": 1,
                      "rhs": 1
                  },
                  "score": 0.5
              }
          ]
      }
    },
    interactionTypes: ["match"],
    interactions: {
      "response1": {
          "type": "match",
          "options": {
              "left": [
                  {
                      "label": "<p>2</p>",
                      "value": 0
                  },
                  {
                      "label": "<p>3</p>",
                      "value": 1
                  }
              ],
              "right": [
                  {
                      "label": "<p>even</p>",
                      "value": 0
                  },
                  {
                      "label": "<p>odd</p>",
                      "value": 1
                  }
              ]
          },
          "validation": {
              "required": "Yes"
          }
      }
    },
    editorState: {
      "options": {
          "left": [
              {
                  "value": {
                      "body": "<p>2</p>",
                      "value": 0
                  }
              },
              {
                  "value": {
                      "body": "<p>3</p>",
                      "value": 1
                  }
              }
          ],
          "right": [
              {
                  "value": {
                      "body": "<p>even</p>",
                      "value": 0
                  }
              },
              {
                  "value": {
                      "body": "<p>odd</p>",
                      "value": 1
                  }
              }
          ]
      },
      "question": "<p>Match the pairs</p>"
    },
    qType: "MTF",
    primaryCategory: "Match The Following Question",
  },
};
