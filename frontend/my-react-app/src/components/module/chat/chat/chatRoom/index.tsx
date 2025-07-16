import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Avatar, Button, Input, Spin, Tooltip } from "antd";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Image } from "antd";
import { useDeleteMessageMutation, useGetChatHistoryQuery, useLazyDownloadMsgQuery } from "../../../../../redux/service/chatApiSlice";

// import image from "../../../../../public/vite.svg";
export const ChatRoom = (props: any) => {
  const { data, messageHistory, setMessageHistory } = props;
  const fileInputRef = useRef<any>(null);
  const chatId = useSelector((state: any) => state?.chat?.chatId);
  const userId = useSelector((state: any) => state?.auth?.userId);
  const socketRef = useRef<any>(null);
  const [imageFile, setImageFile] = useState<any>();
  const [chatSectionHeight, setChatSectionHeight] = useState<any>();
  const [msg, setMsg] = useState("");
  const [showMenu, setShowMenu] = useState();
  const [viewOnce, setViewOnce] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [isViewOnce,setIsViewOnce] = useState(false);
  console.log(chatId, "chatId");

  // ---------API Integration --------------
  const getHistory: any = useGetChatHistoryQuery({ id: chatId });
  const [deleteMsg, deleteMsgInfo] = useDeleteMessageMutation<any>();
  const [triggerDownloadMsg, downloadMsgInfo] = useLazyDownloadMsgQuery();

  useEffect(() => {
    // Connect once when Chat mounts
    socketRef.current = io("http://localhost:8000", {
      path: "/chat/socket.io",
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to chat server");
    });

    // Listen for messages
    socketRef.current.on("chat-message", (msg: any) => {
      setMessageHistory((prev) => [
        ...prev,
        {
          id: msg?._id,
          senderId: msg?.senderId === userId ? "1" : "2",
          receiverId: msg?.senderId === userId ? "2" : "1",
          content: msg?.content,
          createdAt: msg?.createdAt,
          messageType: msg?.messageType,
          viewOnce: msg?.viewOnce,
          hasBeenViewed: msg?.hasBeenViewed,
        },
      ]);
    });
    // Clean up on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const calHeight = () => {
    const totalHeight = document.getElementById("chatContainer");
    const profileHeader = document.getElementById("userDetails");
    const msgSending = document.getElementById("msgSendingDiv");
    if (msgSending && profileHeader && totalHeight) {
      const total = window.innerHeight;
      const profileHeaderHeight = profileHeader.clientHeight;
      const msgSendingHeight = msgSending?.clientHeight;
      const availableHeight = total - msgSendingHeight - profileHeaderHeight - 150;

      setChatSectionHeight(availableHeight);
    }
  };

  useEffect(() => {
    calHeight();
    const resizeObserver = new ResizeObserver(() => {
      calHeight();
    });
    resizeObserver.observe(document.body);
  }, [imageFile]);

  const sendMsg = () => {
    if (msg || imageFile) {
      const payload = {
        senderId: userId,
        chatId: data?.chatId,
        receiverId: data?.id,
        ...(msg && { content: msg }),
        ...(imageFile && { content: imageFile?.image, messageType: "image", viewOnce: viewOnce }),
      };
      console.log(payload, "payload");

      if (socketRef.current) {
        socketRef.current.emit("send-message", payload);
        console.log("msg sent", payload);
      }
      getHistory?.refetch();
      setMsg("");
      setImageFile(null);
    }
  };

  const handleImageInputClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    console.log(file, "file");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageFile({ name: file?.name, image: reader.result });
      };
      reader.readAsDataURL(file); // OR readAsArrayBuffer if you prefer
    }
  };
  console.log(imageFile, "image");

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  const handleShowMenu = (id: any) => {
    // console.log("msg show", id);
    setShowMenu(id);
  };

  const handleViewType = () => {
    setIsViewOnce(true);
  }

  const handleDeleteMsg = (id: any) => {
    deleteMsg(id);
  };

  const handleDownloadMsg = (id: any) => {
    console.log(id, "id");
    const fetch = `http://localhost:8000/chat/download/${id}`;
    // const downloadUrl = new URL(fetch);
    const link = document.createElement("a");
    link.href = fetch;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (deleteMsgInfo?.isSuccess) {
      getHistory?.refetch();
    }
  }, [deleteMsgInfo]);

  return (
    <>
      {chatId ? (
        <>
          <div className="chatContainer" id="chatContainer">
            <div className="chatSubContainer">
              <div className="userDetails" id="userDetails">
                <Avatar className="userDetailsAvatar" />
                <span className="chatUserName">{data?.name}</span>
              </div>
              <Spin spinning={deleteMsgInfo?.isLoading || getHistory?.isLoading}>
                <div className="chatTextDiv" style={{ height: `${chatSectionHeight}` }}>
                  {messageHistory?.map((msg: any) =>
                    msg?.messageType === "image" ? (
                      <Tooltip
                        className="msgTooltip"
                        placement={msg.senderId === "1" ? "right" : "left"}
                        color="black"
                        title={
                          <>
                            {/* <Button onClick={() => handleDeleteMsg(showMenu)}> */}{" "}
                            <div className="msgTooltip">
                              <span className="material-symbols-outlined iconStyle" onClick={() => handleDeleteMsg(showMenu)} style={{ cursor: "pointer" }}>
                                delete
                              </span>
                              <span className="material-symbols-outlined iconStyle" onClick={() => handleDownloadMsg(msg?.id)} style={{ cursor: "pointer" }}>
                                download
                              </span>
                            </div>
                            {/* </Button> */}
                          </>
                        }
                      >
                        <span className={`chatImageMsg${msg.senderId}`} key={msg?.id} onClick={() => handleShowMenu(msg?.id)}>
                          {" "}
                          <Image className="imageFilePerview" src={msg?.content} />
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        className="msgTooltip"
                        placement={msg.senderId === "1" ? "right" : "left"}
                        title={
                          <>
                            {/* <Button onClick={() => handleDeleteMsg(showMenu)}>
                            {" "} */}
                            <span className="material-symbols-outlined iconStyle close" onClick={() => handleDeleteMsg(showMenu)} style={{ cursor: "pointer" }}>
                              delete
                            </span>
                            {/* </Button> */}
                          </>
                        }
                      >
                        <span className={`chatMsg${msg.senderId}`} key={msg?.id} onClick={() => handleShowMenu(msg?.id)}>
                          {msg?.content}
                        </span>
                      </Tooltip>
                    )
                  )}
                </div>
              </Spin>
            </div>
            <div id="msgSendingDiv" style={{ backgroundColor: "rgb(245, 236, 238)" }}>
              {imageFile && (
                <div className="imagePreviewSpan">
                  <img className="imageFilePerview" src={imageFile?.image} />
                  <Button type="text" onClick={handleRemoveImage} className="closeImageBtn">
                    {" "}
                    <span className="material-symbols-outlined iconStyle close">close</span>
                  </Button>
                  <Button type="text" onClick={handleViewType} className="oneViewImageBtn">
                    <span className="material-symbols-outlined">counter_1</span>
                  </Button>
                </div>
              )}
              <div className="msgText">
                <Input
                  onChange={(e: any) => setMsg(e?.target?.value)}
                  value={msg}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && msg.trim()) {
                      sendMsg();
                    }
                  }}
                />
                <Button type="text" className="sendTextMsgBtn" onClick={handleImageInputClick}>
                  <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
                  <span className={`material-symbols-outlined iconStyle`}>attach_file_add</span>
                </Button>

                <Button type="text" className="sendTextMsgBtn" onClick={sendMsg}>
                  {" "}
                  <span className={`material-symbols-outlined iconStyle`}>send</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="chatContainerEmpty">
            {/* <img src={image} /> */}
            <h2 className="contactMsg">Click on Contact to chat</h2>
          </div>
        </>
      )}
    </>
  );
};
