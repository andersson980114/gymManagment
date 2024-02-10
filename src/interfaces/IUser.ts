export default interface IUser {
    fullName:  string;
    age:       string;
    gender:    string;
    document:  string;
    height:    string;
    weight:    string;
    startDate: Date;
    endDate:   Date| number;
    __V?: any;
    _id: any;
}