# 本地server脚本
# 1)启动grunt server服务
# 2）启动监听less变化的服务
# 使用：
#  sh server.sh start  // 启动本机node server
#  sh server.sh restart  // 重启本机node server
#  sh server.sh end  // 结束本机node server
# author yanlingling@baijiahulian.com

#!/bin/bash
   if [ $1 = "start" ]
   then
       nohup grunt server &
       nohup grunt watch &
   elif [ $1 = "end" ]
   then
       ps -ef|grep grunt|grep -v grep|awk '{print $2}'|xargs kill -9
   elif [ $1 = "restart" ]
   then
       ps -ef|grep grunt|grep -v grep|awk '{print $2}'|xargs kill -9
       nohup grunt server &
       nohup grunt watch &
   else
       echo "error"
   fi


