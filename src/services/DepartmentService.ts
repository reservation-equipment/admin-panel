import {InstitutesModel} from "../shared/types/Departments.ts";
import $api from "../api/axios.ts";

export default class DepartmentService {
    static async getAllInstitutes(): Promise<InstitutesModel[]> {
        return $api.get("/departments")
            .then(res => res.data.data)
    }
}