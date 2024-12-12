import { AutoIncrement, Column, DataType, Model, Table } from "sequelize-typescript"



interface UserCreationAttrs {
    name: string;
    surname: string;
    age: number;
    gender: string;
    problems: boolean;
}


@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;


    @Column({type: DataType.STRING, allowNull: false})
    name: string;


    @Column({type: DataType.STRING, allowNull: false})
    surname: string;


    @Column({type: DataType.INTEGER, allowNull: false})
    age: number;


    @Column({type: DataType.STRING, allowNull: false})
    gender: string;


    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
    problems: boolean;

}

