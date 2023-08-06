

state = {
    activeTimerId: null,
    activeSeconds: 0,
    inactiveTimerId: null,
    inactiveSeconds,
};
resetTimer = () => {
    this.state.inactiveSeconds = inactiveSeconds;
    this.startInactivityTimer();
    this.startActivityTimer();
};

startActivityTimer = () => {
    if (!this.state.activeTimerId) {
        this.state.activeTimerId = setInterval(() => {
            this.state.activeSeconds += 1;
        }, 1000);
    }
};

startInactivityTimer = () => {
    if (!this.state.inactiveTimerId) {
        this.state.inactiveTimerId = setInterval(() => {
            this.state.inactiveSeconds -= 1;
            if (this.state.inactiveSeconds === 0) {
                this.stopTimer();
            }
        }, 1000);
    }
};

stopTimer = () => {
    if (this.state.inactiveTimerId) {
        clearInterval(this.state.inactiveTimerId);
        this.state.inactiveTimerId = null;
    }
    if (this.state.activeTimerId) {
        clearInterval(this.state.activeTimerId);
        this.state.activeTimerId = null;
    }
    return this.state.activeSeconds;
};

render = () => {
    return (
            <WrappedComponent
                resetTimer={this.resetTimer}
                stopTimer={this.stopTimer}
                {...this.props}
            />
    );
};