from PIL import Image
import os

# 要轉換的資料夾路徑
folder_path = "/home/virus/Desktop/res"

# 獲取資料夾中所有的檔案
files = os.listdir(folder_path)
print(files)
# 遍歷所有檔案
for file in files:
    # 檢查檔案是否是PNG格式
    if file.endswith(".png"):
        # 讀取PNG圖片
        png_image = Image.open(os.path.join(folder_path, file))

        # 構建WebP檔案路徑，將檔案副檔名更改為.webp
        webp_file_path = os.path.splitext(os.path.join(folder_path, file))[0] + ".webp"

        # 將PNG轉換為WebP
        png_image.save(webp_file_path, "WEBP")

        # 關閉圖片物件
        png_image.close()

        # 刪除原始的PNG檔案
        os.remove(os.path.join(folder_path, file))

        print(f"轉換 {file} 成功")

print("所有PNG檔案轉換完成")
