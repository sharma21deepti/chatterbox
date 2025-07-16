import { Avatar, Button, List, message, Splitter } from "antd";
import React, { useEffect, useState } from "react";
import "./style.css";
import { ChatRoom } from "./chatRoom";
import { useGetAllContactsListQuery } from "../../../../redux/service/contactApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState } from "../../../../redux/slice/auth";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../../../routes/config";
import { useLazyGetChatHistoryQuery } from "../../../../redux/service/chatApiSlice";
import { clearChat, setChatId } from "../../../../redux/slice/chat";
import { CommonModal } from "../../../common/modal";
import { Profile } from "../profile";
import { useGetUserQuery, useUpdateUserMutation } from "../../../../redux/service/loginApiSlice";
export const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state?.auth?.userId);
  const [contactList, setContactList] = useState<any>();
  const name = useSelector((state: any) => state?.auth?.userName);
  const [chatData, setChatData] = useState();
  const [messageHistory, setMessageHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi,contextHolder] = message.useMessage();

  const [updateUser,updateUserInfo] = useUpdateUserMutation({});
  
  console.log(userId, "userId");

  const contactsListQuery = useGetAllContactsListQuery<any>({ id: userId });
  const [triggerGetChatHistory, historyApiResponse] = useLazyGetChatHistoryQuery<any>();
  const userData = useGetUserQuery<any>(userId);
  console.log(userData,"userData");
  
  useEffect(() => {
    if (contactsListQuery?.isSuccess) {
      console.log(contactsListQuery?.data?.contacts, "data>>");

      setContactList(
        contactsListQuery?.data?.contacts?.map((contact: any) => ({
          name: contact?.userName,
          lastmessaged: "1 day ago",
          chatId: contact?.chatId,
          id: contact?._id,
        }))
      );
    }
  }, [contactsListQuery?.isSuccess]);
  console.log(contactList, "contactList");


    useEffect(() => {
      if(updateUserInfo?.isSuccess){
   messageApi.open({
              type:"success",
              content:"Contact Added Successfully"
          });
          setIsModalOpen(false);
          userData.refetch();
      }
  
  
    },[updateUserInfo]);

  const handleLogout = () => {
    dispatch(clearAuthState(""));
    dispatch(clearChat(""));
    navigate(PageRoutes.Login);
  };
  // const contactList = [
  //   { name: "Anuj", lastmessaged: "15:30" },
  //   { name: "Deepti", lastmessaged: "1 day ago" },
  //   { name: "Sunita", lastmessaged: "2 day ago" },
  // ];

  const handleOpenProfile = () => {
    setIsModalOpen(true);
  };

  const handleContactClick = (data: any) => {
    setChatData(data);
    setSelectedItem(data?._id);
    triggerGetChatHistory({ id: data?.chatId });
    console.log(data, "data>>>");
    dispatch(setChatId({ chatId: data?.chatId }));
  };

  useEffect(() => {
    if (historyApiResponse?.isSuccess) {
      console.log(historyApiResponse, "historyApiResponse");

      setMessageHistory(
        historyApiResponse?.data?.messages?.map((msg: any) => ({
          id: msg?._id,
          senderId: msg?.senderId === userId ? "1" : "2",
          receiverId: msg?.senderId === userId ? "2" : "1",
          content: msg?.content,
          createdAt: msg?.createdAt,
          messageType: msg?.messageType,
          viewOnce:msg?.viewOnce,
          hasBeenViewed: msg?.hasBeenViewed,
        }))
      );
    }
  }, [historyApiResponse]);

  // console.log(messageHistory, "messageHistory");

  return (
    <>
      <Splitter style={{ height: "100vh", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <Splitter.Panel defaultSize="20%" min="15%" max="30%" className="chatlist">
          <List
            itemLayout="horizontal"
            dataSource={contactList}
            className="contactList"
            renderItem={(item: any) => (
              <List.Item key={item._id} onClick={() => handleContactClick(item)} className={`chatListItem${selectedItem === item._id ? "selected" : ""}`}>
                <List.Item.Meta title={item.name} description={item.message} />
                <span className="lastmessaged">{item.lastmessaged}</span>
              </List.Item>
            )}
          />
          <div className="profilediv">
            <div className="userDetailsProfile" onClick={handleOpenProfile}>
              <Avatar className="userDetailsAvatar" />
              <span className="chatUserNameProfile">{name}</span>
            </div>
            <Button
              htmlType="submit"
              color="pink"
              variant="filled"
              size="small"
              className="button"
              onClick={handleLogout}
              // style={{
              //   marginLeft: "30px",
              // }}
            >
              Logout
            </Button>
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <ChatRoom data={chatData} messageHistory={messageHistory} setMessageHistory={setMessageHistory} />
        </Splitter.Panel>
      </Splitter>

      {isModalOpen && <Profile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={userData?.data?.data} updateUserInfo={updateUserInfo} updateUser={updateUser}/>}
    </>
  );
};
