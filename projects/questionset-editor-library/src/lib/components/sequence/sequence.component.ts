import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EditorTelemetryService } from '../../services/telemetry/telemetry.service';
import { ConfigService } from '../../services/config/config.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'lib-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent implements OnInit {
  @Input() editorState: any;
  @Input() showFormError;
  @Input() questionPrimaryCategory;
  @Input() isReadOnlyMode;
  @Input() maxScore;
  @Output() editorDataOutput: EventEmitter<any> = new EventEmitter<any>();
  public setCharacterLimit = 100;
  public templateType = 'asq-vertical';
  public options = [];
  public mapping = [];
  constructor(
    public telemetryService: EditorTelemetryService,
    public configService: ConfigService,
  ) { }

  ngOnInit() {
    if (!_.isUndefined(this.editorState.templateId)) {
      this.templateType = this.editorState.templateId;
    }
    this.mapping = _.get(this.editorState, 'responseDeclaration.response1.mapping') || [];
    this.editorDataHandler();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!_.isUndefined(this.editorState.templateId)) {
      this.templateType = this.editorState.templateId;
    }
    if (changes?.maxScore?.currentValue) {
      this.setMapping();
    }
    this.editorDataHandler();
  }

  editorDataHandler(event?) {
    this.setMapping();
    const body = this.prepareASQBody(this.editorState);
    this.editorDataOutput.emit({
      body,
      mediaobj: event ? event.mediaobj : undefined,
    });
  }

  prepareASQBody(editorState) {
    let metadata: any;
    let options;
    options = _.map(editorState.options, (opt, key) => {
      const index = Number(key);
      return { value: { body: opt.body, value: index } };
    });

    metadata = {
      templateId: this.templateType,
      name: this.questionPrimaryCategory || 'Arrange Sequence Question',
      responseDeclaration: this.getResponseDeclaration(editorState),
      outcomeDeclaration: this.getOutcomeDeclaration(),
      interactionTypes: ['order'],
      interactions: this.getInteractions(editorState.options),
      editorState: {
        options,
      },
      qType: 'ASQ',
      primaryCategory: this.questionPrimaryCategory || 'Arrange Sequence Question',
    };
    return metadata;
  }

  getResponseDeclaration(editorState) {
    const values = [];
    if (editorState.options) {
      editorState.options.forEach((option, index) => {
        values.push(index);
      });

      editorState.answer = values;
    }

    const responseDeclaration = {
      response1: {
        cardinality: 'ordered',
        type: 'integer',
        correctResponse: {
          value: values,
        },
        mapping: this.mapping,
      }
    };
    return responseDeclaration;
  }

  getOutcomeDeclaration() {
    const outcomeDeclaration = {
      maxScore: {
        cardinality: 'ordered',
        type: 'integer',
        defaultValue: this.maxScore
      }
    };
    return outcomeDeclaration;
  }

  getInteractions(options) {
    let index;
    const interactOptions = _.map(options, (opt, key) => {
      index = Number(key);
      return { label: opt.body, value: index };
    });
    const interactions = {
      response1: {
        type: 'order',
        options: interactOptions,
      },
    };
    return interactions;
  }

  setMapping() {
    if (!_.isEmpty(this.editorState.options)) {
      this.mapping = [];
      const scoreForEachOption = _.round((this.maxScore / this.editorState.options.length), 2);
      _.forEach(this.editorState.options, (value, key) => {
        const index = Number(key);
        const optionMapping = {
          value: index,
          score: scoreForEachOption,
        }
        this.mapping.push(optionMapping)
      })
    } else {
      this.mapping = [];
    }
  }

  setTemplate(templatedId) {
    this.templateType = templatedId;
    this.editorState.templateId = templatedId;
    this.editorDataHandler();
  }
}