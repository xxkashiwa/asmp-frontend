import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table/data-table';
import { Notice } from '@/models/notice';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getNoticeColumns } from './notice-columns';
import { NoticeDialog } from './notice-dialog';

interface NoticeTableProps {
    data: Notice[];
    onAddNotice: (data: Notice) => Promise<void>;
    onEditNotice: (id: string, data: Notice) => Promise<void>;
    onDeleteNotice: (id: string) => Promise<void>;
}
const searchFieldLabels = {
    title: '标题',
    content: '内容',
    type: '类型',
};

export  const NoticeTable = ({
    data,
    onAddNotice,
    onEditNotice,
    onDeleteNotice,
}: NoticeTableProps) => {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [noticeToEdit, setNoticeToEdit] = useState<Notice | undefined>(undefined);
    const [noticeToDelete, setNoticeToDelete] = useState<Notice | undefined>(undefined);

    const handleEdit = (notice : Notice) => {
        setNoticeToEdit(notice);
    }

    const handleDelete = (notice : Notice) => {
        setNoticeToDelete(notice);
    }
    const handleEditSubmit = async (formData: Notice) => {
        if (noticeToEdit) {
            await onEditNotice(noticeToEdit.id, formData);
            setNoticeToEdit(undefined);
        }
    };

    const handleDeleteConfirm = async () => {
        if (noticeToDelete) {
            await onDeleteNotice(noticeToDelete.id);
            setNoticeToDelete(undefined);
        }
    };

    const columns = getNoticeColumns(handleEdit, handleDelete);

    return(
        <div className = "space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => setOpenAddDialog(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    添加通知
                </Button>
            </div>

            <DataTable 
                tableId = "notice-table"
                columns = {columns}
                data = {data}
                searchKeys = {['title', 'content', 'type']}
                searchLabel = "搜索通知"
                searchFieldLabels = {searchFieldLabels}
            />
            
            <NoticeDialog 
                isOpen = {openAddDialog}
                onClose = {() => setOpenAddDialog(false)}
                onSubmit = {onAddNotice}
                title = "添加通知"
                description = "填写通知信息，带 * 的字段为必填项。"
            />
            <NoticeDialog
                isOpen = {!!noticeToEdit}
                onClose = {() => setNoticeToEdit(undefined)}
                onSubmit = {handleEditSubmit}
                notice = {noticeToEdit}
                title = "编辑通知"
                description = "填写通知信息，带 * 的字段为必填项。"
            />

            <AlertDialog
                open = {!!noticeToDelete}
                onOpenChange={open => !open && setNoticeToDelete(undefined)}    
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确认删除</AlertDialogTitle>
                        <AlertDialogDescription>
                            您确定要删除名为 {noticeToDelete?.title} 的通知吗？此操作无法撤销。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm}>
                        删除
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};

export default NoticeTable;