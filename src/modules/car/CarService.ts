import myCarData from "../../data/MyCarData.json";

class CarService {
  public async getMyCarInfo(): Promise<any> {
    try {
      return myCarData;
    } catch (e) {
      throw e;
    }
  }
}
export const carAPI = new CarService();
