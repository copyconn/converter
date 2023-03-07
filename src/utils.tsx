import React from "react";
import {showNotification} from "@mantine/notifications";
import {IconX} from "@tabler/icons";

export const showLoading = () => {
    showNotification({
        id: 'loading',
        autoClose: false,
        title: 'Загрузка данных',
        message: false,
        color: 'violet',
        styles: () => ({
            root: {
                borderRadius: '8px',
            }
        }),
        loading: true,
    });
}
export const showError = (title: string) => {
    showNotification({
        title: title,
        message: false,
        color: 'red',
        icon: <IconX/>,
        styles: () => ({
            root: {
                borderRadius: '8px',
            }
        }),
    });
}