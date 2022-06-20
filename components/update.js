import fs from "fs";
import { segment } from "oicq";
import lodash from "lodash";
import fetch from "node-fetch";
import { exec } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export const rule = {
    fenupdate: {
        hashMark: true,
        reg: "^#粉酱(强制)?更新$", //匹配消息正则，命令正则
        priority: 50, //优先级，越小优先度越高
        describe: "自主git pull，请先确认git pull命令有效", //【命令】功能说明
    },
    // checkfenupdate: {
    //     reg: "^#*粉酱检查更新$", //匹配消息正则，命令正则
    //     priority: 50, //优先级，越小优先度越高
    //     describe: "强制更新", //【命令】功能说明
    // },

};

const _path = process.cwd();
const resPath = `${_path}/plugins/miao-plugin/resources/`;
const plusPath = `${resPath}/miao-res-plus/`;

const checkAuth = async function (e) {
    return await e.checkAuth({
        auth: "master",
        replyMsg: `只有主人才能命令粉酱哦~`
    });
}
let timer;
export async function fenupdate(e) {
    if (!await checkAuth(e)) {
        return true;
    }
    let isForce = e.msg.includes("强制");
    let command = "git  pull";
    if (isForce) {
        command = "git  checkout . && git  pull";
        e.reply("正在执行强制更新操作，请稍等");
    } else {
        e.reply("正在执行更新操作，请稍等");
    }
    exec(command, { cwd: `${_path}/plugins/fen-plugin/` }, function (error, stdout, stderr) {
        //console.log(stdout);
        if (/Already up[ -]to[ -]date/.test(stdout)) {
            e.reply("目前已经是最新版了~");
            return true;
        }
        if (error) {
            e.reply("更新失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。");
            return true;
        }
        e.reply("更新成功，尝试重新启动Yunzai以应用更新...");
        timer && clearTimeout(timer);
        redis.set("fen:restart-msg", JSON.stringify({
            msg: "重启成功，新版fen-Plugin已经生效",
            qq: e.user_id
        }), { EX: 30 });
        timer = setTimeout(function () {
            let command = `npm run start`;
            if (process.argv[1].includes("pm2")) {
                command = `npm run restart`;
            }
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    e.reply("自动重启失败，请手动重启以应用新版粉酱。\nError code: " + error.code + "\n" + error.stack + "\n");
          Bot.logger.error('重启失败\n${error.stack}');
          return true;
        } else if (stdout) {
          Bot.logger.mark("重启成功，运行已转为后台，查看日志请用命令：npm run log");
          Bot.logger.mark("停止后台运行命令：npm stop");
          process.exit();
        }
      })
    }, 1000);
    });
    return true;
}
