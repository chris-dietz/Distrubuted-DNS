# !/bin/bash
# NOTE: If having trouble running, try adding the --install flag

function usage() {
    cat <<USAGE

    Usage: $0 [--install]

    Options:
        --install:  Installs NVM and updates node
USAGE
    exit 1
}

while [ "$1" != "" ]; do
    case $1 in
    --install)
        wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
        source ~/.bashrc
        nvm install node
        type -P truffle &>/dev/null && echo "Truffle already installed" || npm install -g truffle
        wget https://github.com/trufflesuite/ganache-ui/releases/download/v2.5.4/ganache-2.5.4-linux-x86_64.AppImage
        ;;
    *)
        usage
        exit 1
        ;;
    esac
    shift # remove the current value for `$1` and use the next
done

cd contracts/
truffle compile 
truffle migrate --reset
if [ $? -ne 0 ]; then
    echo "Deploy failed. Is ganche running?"
    exit 1
fi
cd ..
cd ddns-web-client/
npm start