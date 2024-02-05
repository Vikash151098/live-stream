import { Button, Grid } from '@mui/material'
import React, { useEffect, useRef } from 'react'

const LiveStream = () => {

    const senderRef = useRef();
    const receiverRef = useRef();
    const canvasRef = useRef();
    const imageRef = useRef();


    useEffect(() => {

        live_streaming()

        return () => {
            senderRef.current = null;
        }

    }, [senderRef.current])


    const live_streaming = () => {
        // if (!navigator.mediaDevices?.enumerateDevices) {
        //     console.log("enumerateDevices() not supported.");
        // } else {
        //     // List cameras and microphones.
        //     navigator.mediaDevices
        //         .enumerateDevices()
        //         .then((devices) => {
        //             devices.forEach((device) => {
        //                 console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
        //             });
        //         })
        //         .catch((err) => {
        //             console.error(`${err.name}: ${err.message}`);
        //         });
        // }


        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        }).then(stream => {
            // console.log("stream", stream);
            senderRef.current.srcObject = stream;

            senderRef.current.onloadedmetadata = () => {
                senderRef.current.play();
            };
            receiverRef.current.srcObject = stream
        }).catch(err => {
            console.error("err", err);
        });
    }


    const takePhoto = () => {
        let width = 400;
        let height = 300;
        const context = canvasRef.current.getContext("2d");
        canvasRef.current.width = width
        canvasRef.current.height = height
        context.drawImage(senderRef.current, 0, 0, width, height);
        const data = canvas.toDataURL("image/png");
        imageRef.current.src = data

        const a = document.createElement('a');
        a.href = data;
        a.download = "img" + Date.now();
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
    }

    const downloadPhoto = () => {
        const a = document.createElement('a');
        a.href = imageRef.current.src;
        a.download = "img" + new Date();
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
    }

    return (
        <>
            <Grid container justifyContent='center' columnSpacing={3} sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Grid item style={{ width: "50%", height: "100%" }}>
                    <Grid container sx={{ position: "relative", width: "100%", height: "100%" }}>
                        <Grid item sx={{ width: "100%", height: "50%" }}>
                            <video ref={senderRef} muted controls style={{ width: "100%", height: "100%" }}></video>
                        </Grid>
                        <Grid item sx={{ width: "100%", height: "50%" }}>
                            {/* <video ref={receiverRef} muted controls style={{ width: "100%", height: "100%" }}></video> */}
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item style={{ width: "50%" }}>
                    <Grid container flexDirection='column'>
                        <Grid item>
                            <Button onClick={takePhoto} variant='contained'>Take Photo</Button>
                            <Button onClick={downloadPhoto} variant='contained'>Download</Button>
                        </Grid>

                        <Grid item>
                            <canvas ref={canvasRef}> </canvas>
                            <img ref={imageRef} />
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default LiveStream