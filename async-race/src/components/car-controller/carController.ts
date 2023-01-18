import Component from '../../templates/component';
import Car from '../car/car';

class CarController extends Component {
  private car: Car;

  constructor(tagName: string, className: string, color: string) {
    super(tagName, className);
    this.car = new Car('div', 'car', color);
  }

  render(): HTMLElement {
    this.container.append(this.car.render());
    return this.container;
  }
}

export default CarController;
