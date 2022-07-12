class DefaultGroup {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            id: 'default',
            title: "Autre",
            description: "Autre actions",
            weight: 100,
        };
    }
}

module.exports = DefaultGroup;