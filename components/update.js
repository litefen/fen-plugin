import fs from "fs";
import { exec } from "child_process";
const _path = process.cwd();

const mresPath = `${_path}/plugins/fen-plugin/`;

export const rule = {
    fenupdate: {
        reg: "^#*粉酱更新$", //匹配消息正则，命令正则
        priority: 50, //优先级，越小优先度越高
        describe: "自主git pull，请先确认git pull命令有效", //【命令】功能说明
    },
    fenupdate2: {
        reg: "^#*粉酱强制更新$", //匹配消息正则，命令正则
        priority: 50, //优先级，越小优先度越高
        describe: "强制更新", //【命令】功能说明
    },

};

export async function fenupdate(e) {

    if (!e.isMaster) {
        e.reply("您无权操作", true);
        return true;
    }

    let command = "";
    if (fs.existsSync(`${mresPath}`)) {
        e.reply("开始尝试更新，请耐心等待~");
        command = `git -C ${mresPath} pull"`;
        exec(command, function (error, stdout, stderr) {
            if (error) {
                e.reply("更新安装失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。");
            } else {
                e.reply("更新安装成功！您后续也可以通过 #粉酱更新 命令来更新");
            }
        });

    }
    return true;
}

export async function fenupdate2(e) {

    if (!e.isMaster) {
        e.reply("您无权操作", true);
        return true;
    }

    let command = "";
    if (fs.existsSync(`${mresPath}`)) {
        e.reply("开始强制更新，请耐心等待~");
        command = `git -C ${mresPath} checkout . && git -C ${mresPath} pull"`;
        exec(command, function (error, stdout, stderr) {
            if (error) {
                e.reply("更新安装失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。");
            } else {
                e.reply("更新安装成功！您后续也可以通过 #粉酱强制更新 命令来更新");
            }
        });

    }
    return true;
}