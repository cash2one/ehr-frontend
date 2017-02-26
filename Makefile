# 示例：make dev desc=重构代码
export desc
export envName
build:
	grunt build: $(envName)
server:
	grunt server
dev:
	sh ci.sh dev-leads $(desc)
test:
	sh ci.sh test $(desc)
beta:
	sh ci.sh beta $(desc)
master:
	sh ci.sh master $(desc)
debugger:
	open http://192.168.17.11:8888/client/\#hanyangecho; \
	weinre --boundHost 192.168.17.11 --httpPort 8888; 

.PHONY: server dev test beta master build debugger 
