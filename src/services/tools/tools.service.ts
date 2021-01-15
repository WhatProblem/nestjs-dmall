import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ToolsService {

    /**
     * @param {String} password 明文密码
     * @returns {String} 生成加密密码
     */
    getPassword(password: string): string {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT))
        const hashPwd = bcrypt.hashSync(password, salt)
        return hashPwd
    }

    /**
     * @param {String} password 明文密码
     * @param {String} sqlPassword 数据库存储加密密码
     * @returns {Boolean}
     */
    checkPassword(password: string, sqlPassword: string): boolean {
        return bcrypt.compareSync(password, sqlPassword)
    }
}