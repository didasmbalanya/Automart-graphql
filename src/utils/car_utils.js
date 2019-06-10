/* eslint-disable linebreak-style */
export const findCar = (id, data) => {
  const foundCar = data.find(car => car.id.toString() === id);

  if (!foundCar) {
    return false;
  }
  return foundCar;
};

export const findMinPrice = (price, data) => data.filter(
  car => parseFloat(car.price, 10) >= parseFloat(price, 10),
);

export const findMaxPrice = (price, data) => data.filter(
  car => parseFloat(car.price, 10) <= parseFloat(price, 10),
);

export const findByStatus = (status, data) => data.filter(car => car.status === status);
