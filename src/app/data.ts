export const questionSetEditorConfig = {
  context: {
    programId: '',
    contributionOrgId: '',
    user: {
      id: '15155b7a-5316-4bb2-992a-772093e85f44',
      fullName: 'Shubham',
      firstName: 'Shubham ',
      lastName: '',
      orgIds: ['scp-channel']
    },
    identifier: 'do_214234702021410816111',
    authToken: ' ',
    sid: 'iYO2K6dOSdA0rwq7NeT1TDzS-dbqduvV',
    did: '7e85b4967aebd6704ba1f604f20056b6',
    uid: 'bf020396-0d7b-436f-ae9f-869c6780fc45',
    channel: 'scp-channel',
    pdata: {
      id: 'dev.dock.portal',
      ver: '2.8.0',
      pid: 'creation-portal'
    },
    contextRollup: {
      l1: 'scp-channel',
    },
    tags: ['scp-channel'],
    timeDiff: 5,
    objectRollup: {},
    host: '',
    defaultLicense: 'CC BY 4.0',
    endpoint: '/data/v3/telemetry',
    env: 'questionset_editor',
    cloudStorageUrls: [
      "https://knowlg-public.s3-ap-south-1.amazonaws.com/",
    ],
    cloudStorage: {
      provider: "aws",
    },
    framework: "scp-framework", // qa-pratham-framework , qa-scp-framework
    // targetFWIds: ["scp-framework"],
    labels: {
      save_collection_btn_label: 'Save as Draft',
    },
    correctionComments: false,
    sourcingResourceStatus: true
  },
  config: {
    mode: 'edit', // edit / review / read / sourcingReview // orgReview
    userSpecificFrameworkField: {code: "board", value: ["Rajasthan State Open School", "NIOS - Rajasthan"]},
    enableQuestionCreation: true,
    enableAddFromLibrary: true,
    editableFields: {
      sourcingreview: ['instructions'],
      orgreview: ['name', 'instructions', 'learningOutcome'],
      review: ['name', 'description'],
    },
    maxDepth: 4,
    objectType: 'QuestionSet',
    primaryCategory: 'Practice Question Set',
    isRoot: true,
    iconClass: 'fa fa-book',
    hideSubmitForReviewBtn: false,
    children: {
      Question: [
        'Multiple Choice Question',
        'Subjective Question'
      ]
    },
    addFromLibrary: false,
    hierarchy: {
      level1: {
        name: 'Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Practice Question Set',
        iconClass: 'fa fa-folder-o',
        children: {},
        addFromLibrary: true
      },
      level2: {
        name: 'Sub Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Practice Question Set',
        iconClass: 'fa fa-folder-o',
        children: {
          Question: [
            'Multiple Choice Question',
            'Subjective Question'
          ]
        },
        addFromLibrary: true
      },
      level3: {
        name: 'Sub Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Practice Question Set',
        iconClass: 'fa fa-folder-o',
        children: {
          Question: [
            'Subjective Question'
          ]
        }
      }
    },
    contentPolicyUrl: '/term-of-use.html',
    assetProxyUrl: '/assets/public/',
    commonFrameworkLicenseUrl: 'https://creativecommons.org/licenses/'
  }
};

export const questionEditorConfig = {}

export const observationEditorConfig = {}
export const surveyEditorConfig = {}

export const observationRubricsEditorConfig = {}
