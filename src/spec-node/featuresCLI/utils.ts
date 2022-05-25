export const staticProvisionParams = {
    workspaceMountConsistency: 'cached' as 'cached',
    defaultUserEnvProbe: 'loginInteractiveShell' as 'loginInteractiveShell',
    logFormat: 'text' as 'text',
    removeExistingContainer: false,
    buildNoCache: false,
    expectExistingContainer: false,
    postCreateEnabled: true,
    skipNonBlocking: false,
    prebuild: false,
    additionalMounts: [],
    updateRemoteUserUIDDefault: 'on' as 'on',
    additionalCacheFroms: [],
    dockerPath: undefined,
    dockerComposePath: undefined,
    containerDataFolder: undefined,
    containerSystemDataFolder: undefined,
    configFile: undefined,
    overrideConfigFile: undefined,
    persistedFolder: undefined,
    terminalDimensions: undefined,
};

export const staticExecParams = {
    'user-data-folder': undefined,
    'docker-path': undefined,
    'docker-compose-path': undefined,
    'container-data-folder': undefined,
    'container-system-data-folder': undefined,
    'id-label': undefined,
    'config': undefined,
    'override-config': undefined,
    'terminal-rows': undefined,
    'terminal-columns': undefined,
    'remote-env': undefined,
    'container-id': undefined,
    'mount-workspace-git-root': true,
    'log-level': 'info' as 'info',
    'log-format': 'text' as 'text',
    'default-user-env-probe': 'loginInteractiveShell' as 'loginInteractiveShell',
};

// dev-container-features-test-lib
export const testLibraryScript = `
#!/bin/bash
SCRIPT_FOLDER="$(cd "$(dirname $0)" && pwd)"
USERNAME=\${1:-root}

if [ -z $HOME ]; then
    HOME="/root"
fi

FAILED=()

echoStderr()
{
    echo "$@" 1>&2
}

check() {
    LABEL=$1
    shift
    echo -e "\n🧪 Testing $LABEL"
    if "$@"; then 
        echo "✅  Passed!"
        return 0
    else
        echoStderr "❌ $LABEL check failed."
        FAILED+=("$LABEL")
        return 1
    fi
}

checkMultiple() {
    PASSED=0
    LABEL="$1"
    echo -e "\n🧪 Testing $LABEL."
    shift; MINIMUMPASSED=$1
    shift; EXPRESSION="$1"
    while [ "$EXPRESSION" != "" ]; do
        if $EXPRESSION; then ((PASSED++)); fi
        shift; EXPRESSION=$1
    done
    if [ $PASSED -ge $MINIMUMPASSED ]; then
        echo "✅ Passed!"
        return 0
    else
        echoStderr "❌ $LABEL check failed."
        FAILED+=("$LABEL")
        return 1
    fi
}

reportResults() {
    if [ \${#FAILED[@]} -ne 0 ]; then
        echoStderr -e "\n💥  Failed tests: \${FAILED[@]}"
        exit 1
    else 
        echo -e "\n💯  Test Passed.!"
        exit 0
    fi
}`;