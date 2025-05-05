import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
}from '@/components/ui/carousel';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
 } from '@/components/ui/card';
import {useState} from 'react';

//看看字段有无问题是否合适
interface Image{
  url: string | null,
  alt: string | null,
}
interface News{
  id: string,
  title: string,
  description: string | null,
  url: string | null,
  image: Image | null,
  isActive: boolean,
}
//只做了重要新闻轮播部分，其余的，遗留

const CampusNewsManagement: React.FC = () => {
  //遗留，管理新闻
  const [news,setNews] = useState<News[]>([
    {
      id: '1',
      title: '哈基米与胖宝宝的起源',
      description: '哈基米哈基米哈基米哈基米哈基米',
      url: 'https://www.bilibili.com/video/BV1yCYFeJEEQ/',
      image: {
        url: 'https://th.bing.com/th/id/R.7c8467fa6651e8373d97eae99ba90476?rik=%2fpXmz1I3FnBA7g&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2fc87d2fe11ac7ad6735381a5f6f27cca7d970ece1.jpg&ehk=UsNIIhze11ln9d%2fdZGOhtxlKHtZxnUYbLDGwwuXJAlk%3d&risl=&pid=ImgRaw&r=0',
        alt: '哈基米'
      },
      isActive: true
    },
    {
      id: '0d000721',
      title: '大狗叫',
      description: '大狗大狗叫叫叫',
      url: 'https://www.bilibili.com/video/BV1Hm421u7ig?spm_id_from=333.788.recommend_more_video.0&vd_source=3f3dd17dcc0c438c422b63f7083f5b4a',
      image: {
        url: 'https://pic1.zhimg.com/50/v2-e49eb17e86b34af934f549b3e3a952e9_720w.jpg?source=1def8aca',
        alt: '大狗'
      },
      isActive: true

    }
  ]);
  const handleNewsClick = (url: string | null) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold">高校动态管理</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="mb-4 text-gray-600">
          管理学校新闻、政策变动、发展规划等信息
        </p>
          
        <div className="rounded-md border p-4">
          <Carousel className="w-full max-w-3xl mx-auto"
                    opts={{
                      loop: true,

                    }}
          >
            <CarouselContent>
              {news.filter(currentNew => currentNew.isActive).map((currentNew) => (
                <CarouselItem key={currentNew.id}>
                  <div className="p-2">
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleNewsClick(currentNew.url)}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl font-bold hover:text-blue-600">
                          {currentNew.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {currentNew.description && (
                            <p className="text-gray-600 text-sm">{currentNew.description}</p>
                          )}
                          {currentNew.image && currentNew.image.url && (
                            <img 
                              src={currentNew.image.url}
                              alt={currentNew.image.alt || '新闻图片'}
                              className="w-full h-auto rounded-md object-cover max-h-[300px]"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CampusNewsManagement;
