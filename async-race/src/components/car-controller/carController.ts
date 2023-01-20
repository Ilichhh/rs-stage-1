/* eslint-disable @typescript-eslint/keyword-spacing */
import Component from '../../templates/component';
import Car from '../car/car';

class CarController extends Component {
  public id: number;

  public car: Car;

  public carName: HTMLElement;

  public editButton: HTMLElement;

  public deleteButton: HTMLElement;

  public startButton: HTMLButtonElement;

  public stoptButton: HTMLButtonElement;

  constructor(tagName: string, className: string, color: string, name: string, id: number) {
    super(tagName, className);

    this.id = id;
    this.car = new Car('div', 'car', color);
    this.carName = this.createElement('span', 'car-controller__name');
    this.carName.innerText = name;

    this.editButton = this.createElement('button', 'car-controller__edit-btn button');
    this.editButton.innerText = 'EDIT';
    this.deleteButton = this.createElement('button', 'car-controller__delete-btn button');
    this.deleteButton.innerText = 'DELETE';

    this.startButton = <HTMLButtonElement>this.createElement('button', 'car-controller__start-btn button');
    this.startButton.innerText = 'GO';
    this.stoptButton = <HTMLButtonElement>this.createElement('button', 'car-controler__stop-btn button');
    this.stoptButton.innerText = 'BR';
  }

  render(): HTMLElement {
    const editButtonsWrapper = this.createElement('div', 'car-controller__edit-btns-wrapper');
    editButtonsWrapper.append(this.editButton);
    editButtonsWrapper.append(this.deleteButton);
    editButtonsWrapper.append(this.carName);

    const raceTrack = this.createElement('div', 'car-controller__race-track');
    const raceButtonsWrapper = this.createElement('div', 'car-controller__race-btns-wrapper');
    raceButtonsWrapper.append(this.startButton);
    this.stoptButton.disabled = true;
    raceButtonsWrapper.append(this.stoptButton);
    raceTrack.append(raceButtonsWrapper);
    raceTrack.append(this.car.render());

    const finish = this.createElement('div', 'car-controller__finish');
    const finishFlag = this.createElement('span', 'car-controller__finish-flag');
    finish.append(finishFlag);
    raceTrack.append(finish);

    this.container.id = this.id.toString();
    this.container.append(editButtonsWrapper);
    this.container.append(raceTrack);

    return this.container;
  }
}

export default CarController;
