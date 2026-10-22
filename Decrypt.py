import pyAesCrypt
import os

def decryption(file, password):
    buffer_size = 512 * 1024

    if not file.endswith(".crp"):
        return

    output_file = file.replace(".crp", "")

    try:
        pyAesCrypt.decryptFile(str(file), str(output_file), password, buffer_size)
        print("Cipher" + str(os.path.splitext(file)[0]) + "Success")
        os.remove(file)
    except Exception as ex:
        print(ex)

def decrypt_direction(dir, password):
    if dir == "":
        dir = "."
    for name in os.listdir(dir):
        path = os.path.join(dir, name)

        if os.path.isfile(path):
            decryption(path, password)
        else:
            decrypt_direction(path, password)

def main():
    print("File Decryption Tool")
    print("1. Decrypt a single file")
    print("2. Decrypt all files in directory")
    print("3. Exit")

    choice = input("Choose an option (1/2/3): ")

    if choice == "3":
        return

    if choice == "1":
        # Single file decryption
        file_path = input("Enter file path to decrypt: ")

        if not os.path.exists(file_path):
            print("Ошибка: Указанный файл не существует!")
            return

        if not os.path.isfile(file_path):
            print("Ошибка: Указанный путь не является файлом!")
            return

        password = input("PASSWORD: ")
        print("Starting decryption...")
        decryption(file_path, password)
        print("Decryption completed!")
    elif choice == "2":
        # Directory decryption
        path_to_dir = input("PATH: ")

        if path_to_dir != "" and not os.path.exists(path_to_dir):
            print("Ошибка: Указанный путь не существует!")
            return

        password = input("PASSWORD: ")
        print("Starting decryption...")
        decrypt_direction(path_to_dir, password)
        print("Decryption completed!")
    else:
        print("Invalid choice!")

if __name__ == "__main__":
    main()