import axios, { AxiosResponse } from 'axios';
import Matter from '../models/Matter';
import Action from './Action';

export default class GetMattersAction extends Action {
    public getName(): string {
        return 'GetMatters';
    }

    protected validParamsImpl(context: any): boolean {
        return context
            && context.studentId;
    }

    protected async executeImpl(contextToFill: any) {

        const response: AxiosResponse<Matter[]> = await axios.get<Matter[]>('http://localhost:3002/api/v1/matter');
        
        contextToFill.studentMattersArr = response.data.map(mat => mat.name);
        contextToFill.studentMattersObj = response.data.reduce((prev: { [matterName: string]: Matter }, curr: Matter) => {
            prev[curr.name] = curr;
            return prev;
        }, {});
    }
}
