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
import { News } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { getNewsColumns } from './news-columns';
import { NewsDialog } from './news-dialog';

interface NewsTableProps {
    data: News[];
    onAddNews: (data: Omit<News, 'id'>) => Promise<void>;
    onEditNews: (id: number, data: Omit<News, 'id'>) => Promise<void>;
    onDeleteNews: (id: number) => Promise<void>;
}
const searchFieldLabels = {
    title: '标题',
    author: '作者',
    category: '分类',
};

export const NewsTable = ({
    data,
    onAddNews,
    onEditNews,
    onDeleteNews,
}: NewsTableProps) => {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newsToEdit, setNewsToEdit] = useState<News | undefined>(undefined);
    const [newsToDelete, setNewsToDelete] = useState<News | undefined>(undefined);

    const handleEdit = (news : News) => {
        setNewsToEdit(news);
    }

    const handleDelete = (news : News) => {
        setNewsToEdit(news);
    }
    const handleEditSubmit = async (formData: Omit<News,'id'>) => {
        if (newsToEdit) {
            await onEditNews(newsToEdit.id, formData);
            setNewsToEdit(undefined);
        }
    };

    const handleDeleteConfirm = async () => {
        if (newsToDelete) {
            await onDeleteNews(newsToDelete.id);
            setNewsToDelete(undefined);
        }
    };

    const colomns = getNewsColumns(handleEdit, handleDelete);

    return(
        <div className = "space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => setOpenAddDialog(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    添加新闻
                </Button>
            </div>

            <DataTable 
                columns = {colomns}
                data = {data}
                searchKeys = {['title', 'author', 'category']}
                searchLabel = "搜索新闻"
                searchFieldLabels = {searchFieldLabels}
            />
            
            <NewsDialog 
                isOpen = {openAddDialog}
                onClose = {() => setOpenAddDialog(false)}
                onSubmit = {onAddNews}
                title = "添加新闻"
                description = "填写新闻信息，带 * 的字段为必填项。"
            />
            <NewsDialog
                isOpen = {!!newsToEdit}
                onClose = {() => setNewsToEdit(undefined)}
                onSubmit = {handleEditSubmit}
                news = {newsToEdit}
                title = "编辑新闻"
                description = "填写新闻信息，带 * 的字段为必填项。"
            />

            <AlertDialog
                open = {!!newsToDelete}
                onOpenChange={open => !open && setNewsToDelete(undefined)}    
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确认删除</AlertDialogTitle>
                        <AlertDialogDescription>
                            您确定要删除名为 {newsToDelete?.title} 的新闻吗？此操作无法撤销。
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
}