export const sendPushNotification = async (deviceid,msg) => {
    console.log("Demo",deviceid,msg);
    const FIREBASE_API_KEY = "AAAAPs3FQRQ:APA91bEwgnBf4qEwapaHu6-Xqt8AUAKzS-GkYJf0b4KiC2ec-mCvIye8DbMMtT0PoZKxp6k1oPrURZayM04lbOBEFYrHoLObqU8QGYHtthHjwjHLfGGSvxP16O1SMmo4oJsbbCrWvG0H"
    const message = {
        "to" : deviceid,
      notification: {
        title: "india vs south africa test",
        body: "IND chose to bat",
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "high",
        content_available: true,
      },
      data: {
        title: "india vs south africa test",
        body: "IND chose to bat",
        score: 50,
        wicket: 1,
      },
    }
  
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    })
  
    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    })
    response = await response.json()
    console.log("ok",response)
  }