class RandomCarGenerator {
  public static generateColor() {
    const letters = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public static generateName() {
    const brands = ['Tesla', 'Lamborghini', 'Lada', 'Porshe', 'BMW', 'Nissan', 'Hyundai', 'Audi', 'Subaru', 'Jaguar'];
    const models = ['Model X', 'Urus', 'Priora', '911', 'X5', 'Skyline', 'Accent', 'Q3', 'Impreza', 'F-Type'];
    return `${brands[Math.floor(Math.random() * 10)]} ${models[Math.floor(Math.random() * 10)]}`;
  }
}

export default RandomCarGenerator;
