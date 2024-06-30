import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#6BCB77" : "#FD5D5D"
    }
    
    function dieDotsCss() {
        let divCode = ""
        switch (props.value) {
            case 1:
                divCode =   <div className="dice first-face" 
                                    style={styles}
                                    onClick={props.holdDice}
                            >
                                <span className="dot"></span>
                        </div>
            break;
            case 2:
                divCode =   <div className="dice second-face"
                                    style={styles}
                                    onClick={props.holdDice}
                            >
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
            break;
            case 3:
                divCode =   <div className="dice third-face"
                                    style={styles}
                                    onClick={props.holdDice}
                            >
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
            break;
            case 4:
                divCode =   <div className="fourth-face dice"
                                    style={styles}
                                    onClick={props.holdDice}
                            >
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
            break;
            case 5:
                divCode =   <div className="fifth-face dice"
                                    style={styles}
                                    onClick={props.holdDice}
                            >
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                                
                                <div className="column">
                                    <span className="dot"></span>
                                </div>
                                
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>

            break;
            case 6:
                divCode =   <div className="sixth-face dice"
                                    style={styles}
                                    onClick={props.holdDice}
                                >
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                                <div className="column">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                        <span className="dot"></span>
                                </div>
                            </div>
            break;          
        }
        return divCode
    }
        return(
            dieDotsCss()
        )    
}