# 自动化打包、发布，在执行脚本命令中传递 develop 或 master 区分测试和正式环境
#!/bin/bash

git_url="http://gitlab.efengqing.com/it/yunfadan_seller.git"
dir_source="../"
dir_deploy="dist"
dir_deploy_git="deploy-git"

rm -rf ${dir_deploy}
rm -rf ${dir_deploy_git}

mkdir ${dir_deploy}
mkdir ${dir_deploy_git}

git clone ${git_url} ${dir_deploy_git}

cd "./${dir_deploy_git}"

git checkout -b develop origin/develop

mv ".git" "../${dir_deploy}"

cd ${dir_source}
