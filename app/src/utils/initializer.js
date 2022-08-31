export const BotInitializer = (startMessage = undefined, defaultAttributes = {}) => {
    class Config {};

    const config = new Config();

    config.startMessage = startMessage;
    config.defaultStartMessage = startMessage;

    config.addAttribute = (name, value) => {
        config.attributes[name] = value;
    };

    config.addAttributes = (newAttributes) => {
        for (const [name, value] of Object.entries(newAttributes)) {
          config.attributes[name] = value;
        }

    };

    config.resetAttributes = () => {
        config.attributes = {
                // TODO add version
                clientType: 'web',
                clientScreen: true,
            };
        config.addAttributes(defaultAttributes);
    };

    config.resetAttributes();

    config.getAttribute = (name) => {
        return config.attributes[name];
    };

    config.getAttributes = () => {
        return config.attributes;
    };

    config.setMessage = (value) => {
        config.startMessage = value;
    };

    config.getMessage = () => {
        return config.startMessage;
    };

    return config;
}