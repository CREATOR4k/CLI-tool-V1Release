import pyAesCrypt
import os

def encryption(file, password):
    buffer_size = 512 * 1024

    if file.endswith(".crp"):
        return

    try:
        pyAesCrypt.encryptFile(str(file), str(file) + ".crp", password, buffer_size)
        print("Cipher" + str(os.path.splitext(file)[0]) + "Success")
        os.remove(file)
    except Exception as ex:
        print(ex)

def encrypt_direction(dir, password):
    if dir == "":
        dir = "."
    for name in os.listdir(dir):
        path = os.path.join(dir, name)

        if os.path.isfile(path):
            encryption(path, password)
        else:
            encrypt_direction(path, password)

def main():
    print("File Encryption Tool")
    print("1. Encrypt a single file")
    print("2. Encrypt all files in directory")
    print("3. Exit")

    choice = input("Choose an option (1/2/3): ")

    if choice == "3":
        return

    if choice == "1":
        # Single file encryption
        file_path = input("Enter file path to encrypt: ")

        if not os.path.exists(file_path):
            print("Ошибка: Указанный файл не существует!")
            return

        if not os.path.isfile(file_path):
            print("Ошибка: Указанный путь не является файлом!")
            return

        password = input("PASSWORD: ")
        print("Starting encryption...")
        encryption(file_path, password)
        print("Encryption completed!")
    elif choice == "2":
        # Directory encryption
        path_to_dir = input("PATH: ")

        if path_to_dir != "" and not os.path.exists(path_to_dir):
            print("Ошибка: Указанный путь не существует!")
            return

        password = input("PASSWORD: ")
        print("Starting encryption...")
        encrypt_direction(path_to_dir, password)
        print("Encryption completed!")
    else:
        print("Invalid choice!")

if __name__ == "__main__":
    main()