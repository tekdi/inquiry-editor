import { TelemetryInteractDirective } from '../../directives/telemetry-interact/telemetry-interact.directive';
import { EditorTelemetryService } from '../../services/telemetry/telemetry.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../services/config/config.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { editorOptionData } from './sequence.component.spec.data';
import { SequenceComponent } from './sequence.component';
import { SimpleChange } from '@angular/core';

describe('SequenceComponent', () => {
  let component: SequenceComponent;
  let fixture: ComponentFixture<SequenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SequenceComponent, TelemetryInteractDirective],
      providers: [ConfigService, EditorTelemetryService]
    });
    fixture = TestBed.createComponent(SequenceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("#ngOnInit() should call editorDataHandler on ngOnInit", () => {
    component.editorState = editorOptionData;
    spyOn(component, "ngOnInit").and.callThrough();
    spyOn(component, "editorDataHandler").and.callFake(() => {});
    component.ngOnInit();
    expect(component.editorDataHandler).toHaveBeenCalled();
  });

  it("ngOnChanges should call editorDataHandler", () => {
    component.editorState = editorOptionData;
    spyOn(component, "editorDataHandler").and.callFake(() => {});
    spyOn(component, "ngOnChanges").and.callThrough();
    spyOn(component, "setMapping").and.callFake(() => {});
    component.ngOnChanges({
      maxScore: new SimpleChange(1, 2, false),
    });
    expect(component.editorDataHandler).toHaveBeenCalled();
    expect(component.setMapping).toHaveBeenCalled();
  });

  it('#editorDataHandler() should emit option data', () => {
    spyOn(component, 'prepareASQBody').and.callFake(() => {});
    spyOn(component.editorDataOutput, 'emit').and.callFake(() => {});
    component.editorState = editorOptionData;
    component.editorDataHandler();
    expect(component.prepareASQBody).toHaveBeenCalledWith(component.editorState);
    expect(component.editorDataOutput.emit).toHaveBeenCalled();
  });

  it("#prepareASQBody() should return expected asq option data for ASQ", () => {
    component.maxScore = 4;
    spyOn(component, 'setMapping').and.callThrough();
    spyOn(component, "getResponseDeclaration").and.callThrough();
    spyOn(component, "getInteractions").and.callThrough();
    component.prepareASQBody(editorOptionData);
    expect(component.getResponseDeclaration).toHaveBeenCalledWith(
      editorOptionData
    );
    expect(component.getInteractions).toHaveBeenCalledWith(
      editorOptionData.options
    );
  });

  it('#getResponseDeclaration() should return responseDeclaration', () => {
    const editorState = editorOptionData;
    spyOn(component, 'getResponseDeclaration').and.callThrough();
    component.mapping = [
      { "value": 0, "score": 0.25 },
      { "value": 1, "score": 0.25 },
      { "value": 2, "score": 0.25 },
      { "value": 3, "score": 0.25 }
    ]
    const responseDeclaration = component.getResponseDeclaration(editorState);

    expect(responseDeclaration).toEqual({
      response1: {
        cardinality: 'ordered',
        type: 'integer',
        correctResponse: {
          value: [0, 1, 2, 3],
        },
        mapping: component.mapping,
      },
    });
  });

  it('#getOutcomeDeclaration() should return the correct outcomeDeclaration', () => {
    component.maxScore = 1;
    const expectedOutcomeDeclaration = {
      maxScore: {
        cardinality: 'ordered',
        type: 'integer',
        defaultValue: component.maxScore
      }
    };

    const outcomeDeclaration = component.getOutcomeDeclaration();
    expect(outcomeDeclaration).toEqual(expectedOutcomeDeclaration);
  });

  it('#getInteractions() should return interactions', () => {
    const options = [
      { body: '<p>1</p>', length: 1 },
      { body: '<p>2</p>', length: 1 },
      { body: '<p>3</p>', length: 1 },
      { body: '<p>4</p>', length: 1 }
    ];

    const expectedInteractions = {
      response1: {
        type: 'order',
        options: [
          { label: '<p>1</p>', value: 0 },
          { label: '<p>2</p>', value: 1 },
          { label: '<p>3</p>', value: 2 },
          { label: '<p>4</p>', value: 3 },
        ],
      },
    };

    const interactions = component.getInteractions(options);
    expect(interactions).toEqual(expectedInteractions);
  });

  it('#setMapping should set mapping with empty array when editorState options is empty', () => {
    spyOn(component, 'setMapping').and.callThrough();
    component.editorState = {};
    component.setMapping();
    expect(component.mapping).toEqual([]);
  });

  it('#setTemplate() should set #templateType to "asq-horizontal"', () => {
    spyOn(component, "editorDataHandler").and.callFake(() => {});
    const templateType = "asq-horizontal";
    component.editorState = editorOptionData;
    component.setTemplate(templateType);
    expect(component.templateType).toEqual(templateType);
    expect(component.editorDataHandler).toHaveBeenCalled();
  });
});
