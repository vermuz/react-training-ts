import * as React from 'react';
import * as moment from 'moment';
import {Training} from '../../../../models/training';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';
import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
import {formatConstants} from '../../../../common/constants/formatConstants';

interface Props {
  training: Training;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

interface State {
  isOpenStartDateModal: boolean;
  isOpenEndDateModal: boolean;
}

export class TrainingFormComponent extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isOpenStartDateModal: false,
      isOpenEndDateModal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.toggleOpenStartDateModal = this.toggleOpenStartDateModal.bind(this);
    this.toggleOpenEndDateModal = this.toggleOpenEndDateModal.bind(this);
    this.save = this.save.bind(this);
  }

  private onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.type === 'checkbox' ?
      event.target.checked :
      event.target.value;

    this.props.onChange(fieldName, value);
  }

  private onChangeStartDate(date: moment.Moment) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  private onChangeEndDate(date: moment.Moment) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  private onChangeDate(fieldName: string, date: moment.Moment) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

  private toggleOpenStartDateModal() {
    this.toggleOpenModal('isOpenStartDateModal');
  }

  private toggleOpenEndDateModal() {
    this.toggleOpenModal('isOpenEndDateModal');
  }

  private toggleOpenModal(fieldName) {
    this.setState({
      ...this.state,
      [fieldName]: !this.state[fieldName]
    });
  }

  private save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  public render() {
    return (
      <form className="container">
        <div className="row">
          <InputComponent
            className="col-md-6"
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.props.training.name}
            placeholder="Name"
          />

          <InputComponent
            className="col-md-6"
            type="text"
            label="Url"
            name="url"
            onChange={this.onChange}
            value={this.props.training.url}
            placeholder="Url"
          />
        </div>

        <div className="row">
          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="Start date"
            name="startDate"
            placeholder="Start date"
            value={moment(this.props.training.startDate).format(formatConstants.shortDate)}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={this.toggleOpenStartDateModal}
            icon="glyphicon glyphicon-calendar"
          />

          <DatePickerModalComponent
            isOpen={this.state.isOpenStartDateModal}
            onClose={this.toggleOpenStartDateModal}
            selectedDate={this.props.training.startDate}
            onChange={this.onChangeStartDate}
          />

          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="End date"
            name="endDate"
            placeholder="End date"
            value={moment(this.props.training.endDate).format(formatConstants.shortDate)}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={this.toggleOpenEndDateModal}
            icon="glyphicon glyphicon-calendar"
          />

          <DatePickerModalComponent
            isOpen={this.state.isOpenEndDateModal}
            onClose={this.toggleOpenEndDateModal}
            selectedDate={this.props.training.endDate}
            onChange={this.onChangeEndDate}
          />
        </div>

        <div className="row">
          <CheckBoxComponent
            className="col-md-6"
            label="Active"
            name="isActive"
            onChange={this.onChange}
            value={this.props.training.isActive}
          />
        </div>

        <div className="row">
          <div className="form-group pull-right">
            <div className="col-md-1">
              <button type="button" className="btn btn-lg btn-success" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};
