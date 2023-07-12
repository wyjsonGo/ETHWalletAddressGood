module.exports = {
  apps : [{
    name: 'ETHWAG2',
    script: 'ETHWAG2.js',
//    cron_restart: '*/5 * * * *', //每隔5分钟自动重启 crontab执行时间计算 https://tool.lu/crontab/
    max_memory_restart: '150M',
    autorestart: true,
    watch: [
        'ETHWAG2.js'
    ]
  }]
};
