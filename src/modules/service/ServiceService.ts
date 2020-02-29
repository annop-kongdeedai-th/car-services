import myCarData from "../../data/MyCarData.json";

class ServiceService {
  public async getServiceDetail(id: number): Promise<any> {
    try {
      return myCarData.serviceHistory.find((service: any) => service.id === id);
    } catch (e) {
      throw e;
    }
  }
}
export const serviceAPI = new ServiceService();
