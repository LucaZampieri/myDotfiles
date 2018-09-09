# myDotfiles
Repository storing the dotfiles I use on my ubuntu. These are mainly for backup purpose, but feel free to get inspired

### About
I followed the suggestions of this link https://developer.atlassian.com/blog/2016/02/best-way-to-store-dotfiles-git-bare-repo/
as of the 10 september 2018

to setup a similar repo do:
```
git init --bare $HOME/.cfg
alias config='/usr/bin/git --git-dir=$HOME/.dotfile_cfg/ --work-tree=$HOME'
config config --local status.showUntrackedFiles no
echo "alias config='/usr/bin/git --git-dir=$HOME/.dotfile_cfg/ --work-tree=$HOME'" >> $HOME/.bashrc
```
where the alias replaces the usual git command. The last line add the alias to the bashrc for following uses.

a typical use would be: 
```
config status
config add .vimrc
config commit -m "Add vimrc"
config add .bashrc
config commit -m "Add bashrc"
config push
```

To install thoses files on a new machine do the following: (after having removed/baked-up the possibling conflicting dotfiles)
```
alias config='/usr/bin/git --git-dir=$HOME/.dotfile_cfg/ --work-tree=$HOME'
echo ".dotfile_cfg" >> .gitignore
git clone --bare <git-repo-url> $HOME/.dotfile_cfg
alias config='/usr/bin/git --git-dir=$HOME/.dotfile_cfg/ --work-tree=$HOME'
config checkout
config config status.showUntrackedFiles no
config status
```

### Thanks
again thanks to the article: https://developer.atlassian.com/blog/2016/02/best-way-to-store-dotfiles-git-bare-repo/ for the help
