import Component from '../../templates/component';
import Car from '../car/car';

class CarController extends Component {
  private car: Car;

  private carName: HTMLElement;

  private editButton: HTMLElement;

  private deleteButton: HTMLElement;

  private startButton: HTMLElement;

  private stoptButton: HTMLElement;

  constructor(tagName: string, className: string, color: string, name: string) {
    super(tagName, className);

    this.car = new Car('div', 'car', color);
    this.carName = this.createElement('span', 'car-controller__name');
    this.carName.innerText = name;

    this.editButton = this.createElement('button', 'car-controller__edit-btn button');
    this.editButton.innerText = 'EDIT';
    this.deleteButton = this.createElement('button', 'car-controller__delete-btn button');
    this.deleteButton.innerText = 'DELETE';

    this.startButton = this.createElement('button', 'car-controller__start-btn button');
    this.startButton.innerText = 'GO';
    this.stoptButton = this.createElement('button', 'car-controler__stop-btn button');
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
    raceButtonsWrapper.append(this.stoptButton);
    raceTrack.append(raceButtonsWrapper);
    raceTrack.append(this.car.render());

    const finish = this.createElement('div', 'car-controller__finish');
    const finishFlag = this.createElement('span', 'car-controller__finish-flag');
    finish.append(finishFlag);
    raceTrack.append(finish);

    this.container.append(editButtonsWrapper);
    this.container.append(raceTrack);

    return this.container;
  }
}

export default CarController;
